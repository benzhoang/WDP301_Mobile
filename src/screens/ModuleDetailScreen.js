import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ModuleDetailScreen({ route, navigation }) {
  const { module, course } = route.params;

  const handleLessonPress = (lesson) => {
    navigation.navigate('LessonDetail', { lesson, module, course });
  };

  const renderLesson = ({ item }) => (
    <TouchableOpacity style={styles.lessonItem} onPress={() => handleLessonPress(item)}>
      <Text style={styles.lessonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.meta}>Khóa học: {course.title}</Text>
      <Text style={styles.sectionTitle}>Danh sách bài học</Text>
      <FlatList
        data={module.lessons}
        keyExtractor={l => l.id}
        renderItem={renderLesson}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 13, color: '#888', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  lessonItem: { backgroundColor: '#f3f3f3', borderRadius: 8, padding: 12, marginBottom: 10 },
  lessonText: { fontSize: 15, color: '#3498ff', fontWeight: 'bold' },
}); 