import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CourseLearningScreen({ route, navigation }) {
  const course = route?.params?.course;

  const handleLessonPress = (lesson, module) => {
    navigation.navigate('LessonDetail', { lesson, module, course });
  };

  const renderLesson = ({ item }, module) => {
    // Nếu tiêu đề có từ 'video' hoặc 'clip' thì dùng icon play, ngược lại dùng icon book
    const lowerTitle = item.title.toLowerCase();
    const isVideo = lowerTitle.includes('video') || lowerTitle.includes('clip');
    return (
      <TouchableOpacity style={styles.lessonButton} onPress={() => handleLessonPress(item, module)} activeOpacity={0.7}>
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

  const renderModule = ({ item }) => (
    <View style={styles.moduleContainer}>
      <Text style={styles.moduleTitle}>{item.title}</Text>
      <FlatList
        data={item.lessons}
        keyExtractor={l => l.id}
        renderItem={(props) => renderLesson(props, item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.meta}>Tác giả: {course.author} | Ngày đăng: {course.date} | Thời lượng: {course.duration}</Text>
      <Text style={styles.sectionTitle}>Lộ trình học</Text>
      <FlatList
        data={course.modules}
        keyExtractor={m => m.id}
        renderItem={renderModule}
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
  moduleContainer: { backgroundColor: '#f3f3f3', borderRadius: 8, padding: 16, marginBottom: 12 },
  moduleTitle: { fontSize: 15, fontWeight: 'bold', color: '#3498ff', marginBottom: 8 },
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