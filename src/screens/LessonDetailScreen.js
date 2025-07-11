import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LessonDetailScreen({ route }) {
  const { lesson, module, course } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.meta}>Khóa học: {course.title}</Text>
      <Text style={styles.meta}>Module: {module.title}</Text>
      <Text style={styles.sectionTitle}>Nội dung bài học</Text>
      <Text style={styles.content}>Đây là nội dung chi tiết của bài học. (Bạn có thể cập nhật nội dung thực tế ở đây)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 13, color: '#888', marginBottom: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  content: { fontSize: 15, color: '#444' },
}); 