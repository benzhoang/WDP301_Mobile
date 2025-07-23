import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enrollProgram, checkEnrollment } from '../utils/api';

export default function CourseDetailScreen({ route, navigation }) {
  const course = route?.params?.course;
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);

  // Kiểm tra trạng thái enroll khi mở màn hình
  useEffect(() => {
    const fetchEnrollStatus = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token, 'Program ID:', course.program_id);
        const res = await checkEnrollment(token, course.program_id);
        setJoined(Array.isArray(res.data.data) && res.data.data.length > 0);
      } catch (err) {
        setJoined(false); // Nếu lỗi (chưa enroll) thì cho phép đăng ký
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollStatus();
  }, [course.program_id]);

  const handleJoin = async () => {
    setEnrollLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      await enrollProgram(token, course.program_id);
      setJoined(true);
      Alert.alert('Tham gia thành công!');
    } catch (err) {
      Alert.alert('Lỗi', err?.response?.data?.message || 'Không thể tham gia chương trình');
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleEnterCourse = () => {
    navigation.navigate('CourseLearning', { course });
  };

  const renderContent = ({ item }) => (
    <View style={styles.contentItem}>
      <Text style={styles.contentTitle}>{item.title}</Text>
      <Text style={styles.contentType}>Loại: {item.type || item.content_type}</Text>
      {item.type === 'markdown' || item.content_type === 'markdown' ? (
        <Text numberOfLines={4} style={styles.contentPreview}>{item.content_file_link?.slice(0, 200)}...</Text>
      ) : null}
      {item.type === 'video' || item.content_type === 'video' ? (
        <Text style={styles.contentPreview}>Video: {item.content_file_link}</Text>
      ) : null}
    </View>
  );

  const renderHeader = () => (
    <View>
      {course.img_link ? (
        <Image source={{ uri: course.img_link }} style={styles.courseImage} />
      ) : null}
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.meta}>
        {course.category?.name ? `Chủ đề: ${course.category.name}` : ''}
        {course.age_group ? ` | Độ tuổi: ${course.age_group}` : ''}
        {course.create_at ? ` | Ngày tạo: ${new Date(course.create_at).toLocaleDateString()}` : ''}
      </Text>
      <Text style={styles.description}>{course.description}</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#3498ff" style={{ marginTop: 16 }} />
      ) : joined ? (
        <TouchableOpacity style={[styles.button, styles.buttonJoined]} onPress={handleEnterCourse}>
          <Text style={styles.buttonText}>Vào chương trình</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleJoin} disabled={enrollLoading}>
          <Text style={styles.buttonText}>{enrollLoading ? 'Đang tham gia...' : 'Tham gia chương trình'}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.sectionTitle}>Nội dung chương trình</Text>
    </View>
  );

  return (
    <FlatList
      data={course.contents || []}
      keyExtractor={item => item.content_id?.toString()}
      renderItem={renderContent}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  courseImage: { width: '100%', height: 160, borderRadius: 10, marginBottom: 12, resizeMode: 'cover' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 13, color: '#888', marginBottom: 8 },
  description: { fontSize: 15, color: '#444', marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  contentItem: { marginBottom: 12, backgroundColor: '#f6f6f6', borderRadius: 8, padding: 10 },
  contentTitle: { fontSize: 15, fontWeight: 'bold', color: '#3498ff', marginBottom: 2 },
  contentType: { fontSize: 13, color: '#888', marginBottom: 2 },
  contentPreview: { fontSize: 13, color: '#444' },
  button: { backgroundColor: '#3498ff', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 24 },
  buttonJoined: { backgroundColor: '#2ecc71' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 