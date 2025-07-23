import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleContentCompletion, getEnrollmentProgress } from '../utils/api';

// Hàm kiểm tra content đã hoàn thành chưa
async function checkContentCompleted(token, programId, contentId) {
  try {
    const res = await getEnrollmentProgress(token, programId);
    const enrollments = res.data.data;
    if (Array.isArray(enrollments) && enrollments.length > 0) {
      const progressArr = enrollments[0].progress || [];
      const found = progressArr.find(p => p.content_id === contentId);
      return !!(found && found.complete);
    }
  } catch (err) {
    // Nếu lỗi, coi như chưa hoàn thành
  }
  return false;
}

export default function LessonDetailScreen({ route }) {
  const { content, course, enrollId } = route.params;
  const isMarkdown = (content.type || content.content_type) === 'markdown';
  const isVideo = (content.type || content.content_type) === 'video';
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(!!content.complete);

  // Kiểm tra trạng thái hoàn thành khi vào màn hình
  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('token');
      const isDone = await checkContentCompleted(token, course.program_id, content.content_id);
      setCompleted(isDone);
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.content_id, course.program_id]);

  const handleToggleComplete = async () => {
    if (!enrollId) {
      Alert.alert('Không tìm thấy enrollId!');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      await toggleContentCompletion(token, enrollId, content.content_id);
      // Gọi lại kiểm tra trạng thái sau khi toggle
      const isDone = await checkContentCompleted(token, course.program_id, content.content_id);
      setCompleted(isDone);
      Alert.alert('Cập nhật trạng thái hoàn thành thành công!');
    } catch (err) {
      Alert.alert('Lỗi', err?.response?.data?.message || 'Không thể cập nhật trạng thái hoàn thành');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.meta}>Chương trình: {course.title}</Text>
        <Text style={styles.sectionTitle}>Nội dung</Text>
        {isMarkdown ? (
          <Text style={styles.content}>{content.content_file_link}</Text>
        ) : isVideo ? (
          <TouchableOpacity onPress={() => Linking.openURL(content.content_file_link)}>
            <Text style={[styles.content, { color: '#3498ff', textDecorationLine: 'underline' }]}>Xem video: {content.content_file_link}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.content}>{content.content_file_link}</Text>
        )}
        <TouchableOpacity
          style={[styles.completeBtn, completed ? styles.completed : null]}
          onPress={handleToggleComplete}
          disabled={loading}
        >
          <Text style={styles.completeBtnText}>{loading ? 'Đang cập nhật...' : completed ? 'Đã hoàn thành (bấm để bỏ hoàn thành)' : 'Đánh dấu hoàn thành bài học'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 13, color: '#888', marginBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  content: { fontSize: 15, color: '#444' },
  completeBtn: { backgroundColor: '#3498ff', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 24, marginBottom: 24 },
  completed: { backgroundColor: '#2ecc71' },
  completeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 