import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CourseLearningScreen({ route, navigation }) {
  const course = route?.params?.course;
  const contents = course.contents || [];

  // Lấy enrollId từ enrollment_status nếu có, nếu không thì tự ghép từ userId và program_id
  const getEnrollId = async () => {
    if (course.enrollment_status && course.enrollment_status.enroll_id) {
      return course.enrollment_status.enroll_id;
    }
    const userStr = await AsyncStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (user && course.program_id) {
      return `${user.id || user.user_id}_${course.program_id}`;
    }
    return null;
  };

  const handleContentPress = async (content) => {
    const enrollId = await getEnrollId();
    navigation.navigate('LessonDetail', { content, course, enrollId });
  };

  const renderContent = ({ item }) => {
    const lowerTitle = (item.title || '').toLowerCase();
    const isVideo = (item.type || item.content_type) === 'video' || lowerTitle.includes('video') || lowerTitle.includes('clip');
    return (
      <TouchableOpacity style={styles.lessonButton} onPress={() => handleContentPress(item)} activeOpacity={0.7}>
        <Ionicons
          name={isVideo ? 'play-circle-outline' : 'book-outline'}
          size={22}
          color={isVideo ? '#e67e22' : '#3498ff'}
          style={styles.lessonTypeIcon}
        />
        <Text style={styles.lessonText}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#3498ff" style={styles.lessonIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.meta}>
        {course.category?.name ? `Chủ đề: ${course.category.name}` : ''}
        {course.age_group ? ` | Độ tuổi: ${course.age_group}` : ''}
        {course.create_at ? ` | Ngày tạo: ${new Date(course.create_at).toLocaleDateString()}` : ''}
      </Text>
      <Text style={styles.sectionTitle}>Nội dung chương trình</Text>
      <FlatList
        data={contents}
        keyExtractor={item => item.content_id?.toString()}
        renderItem={renderContent}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 13, color: '#888', marginBottom: 8 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  lessonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf2fb',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    elevation: 1,
  },
  lessonTypeIcon: { marginRight: 10 },
  lessonText: { flex: 1, fontSize: 15, color: '#222', fontWeight: 'bold' },
  lessonIcon: { marginLeft: 8 },
}); 