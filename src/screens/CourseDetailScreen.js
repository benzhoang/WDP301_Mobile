import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { courses } from './CoursesScreen';

export default function CourseDetailScreen({ route, navigation }) {
  const course = route?.params?.course;
  const [joined, setJoined] = useState(false);

  // Lấy các khóa học liên quan (khác id)
  const relatedCourses = courses.filter(c => c.id !== course.id).slice(0, 2);

  const handleJoin = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn tham gia khóa học này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đồng ý', onPress: () => setJoined(true) },
      ]
    );
  };

  const handleEnterCourse = () => {
    navigation.navigate('CourseLearning', { course });
  };

  const renderLesson = ({ item }) => (
    <View style={styles.lessonItem}>
      <Text style={styles.lessonText}>• {item.title}</Text>
    </View>
  );

  const renderModule = ({ item }) => (
    <View style={styles.moduleContainer}>
      <Text style={styles.moduleTitle}>{item.title}</Text>
      <FlatList
        data={item.lessons}
        keyExtractor={l => l.id}
        renderItem={renderLesson}
      />
    </View>
  );

  const renderRelated = ({ item }) => (
    <TouchableOpacity
      style={styles.relatedItem}
      onPress={() => navigation.push('CourseDetail', { course: item })}
    >
      <Text style={styles.relatedTitle}>{item.title}</Text>
      <Text style={styles.relatedMeta}>Tác giả: {item.author} | Ngày đăng: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.meta}>Tác giả: {course.author} | Ngày đăng: {course.date} | Thời lượng: {course.duration}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.sectionTitle}>Lộ trình học</Text>
      <FlatList
        data={course.modules}
        keyExtractor={m => m.id}
        renderItem={renderModule}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      {joined ? (
        <TouchableOpacity style={[styles.button, styles.buttonJoined]} onPress={handleEnterCourse}>
          <Text style={styles.buttonText}>Vào khóa học</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleJoin}>
          <Text style={styles.buttonText}>Tham gia khóa học</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.sectionTitle}>Khóa học liên quan</Text>
      <FlatList
        data={relatedCourses}
        keyExtractor={item => item.id}
        renderItem={renderRelated}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 13, color: '#888', marginBottom: 8 },
  description: { fontSize: 15, color: '#444', marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  moduleContainer: { marginBottom: 12 },
  moduleTitle: { fontSize: 15, fontWeight: 'bold', color: '#3498ff', marginBottom: 4 },
  lessonItem: { marginLeft: 12, marginBottom: 2 },
  lessonText: { fontSize: 14, color: '#333' },
  button: { backgroundColor: '#3498ff', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 24 },
  buttonJoined: { backgroundColor: '#2ecc71' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  relatedItem: { backgroundColor: '#f3f3f3', borderRadius: 8, padding: 12, marginBottom: 10 },
  relatedTitle: { fontSize: 15, fontWeight: 'bold', color: '#3498ff' },
  relatedMeta: { fontSize: 12, color: '#888', marginTop: 2 },
}); 