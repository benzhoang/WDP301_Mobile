import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { getProgramsWithStatus } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CoursesScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Bạn cần đăng nhập để xem khóa học');
        const res = await getProgramsWithStatus(token);
        setCourses(res.data.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Lỗi khi tải danh sách chương trình');
        Alert.alert('Lỗi', err?.response?.data?.message || err.message || 'Lỗi khi tải danh sách chương trình');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetail', { course: item })}
    >
      {item.img_link ? (
        <Image source={{ uri: item.img_link }} style={styles.courseImage} />
      ) : null}
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDesc}>{item.description}</Text>
      <Text style={styles.courseMeta}>
        {item.category?.name ? `Chủ đề: ${item.category.name}` : ''}
        {item.age_group ? ` | Độ tuổi: ${item.age_group}` : ''}
      </Text>
      <Text style={styles.statusText}>
        {item.enrollmentStatus?.is_enrolled ?
          (item.enrollmentStatus?.has_complete ? 'Đã hoàn thành' : 'Đang học')
          : 'Chưa tham gia'}
      </Text>
      {item.enrollmentStatus?.is_enrolled && (
        <Text style={styles.progressText}>
          Tiến độ: {item.enrollmentStatus?.progress_percentage || 0}%
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text>Đang tải danh sách chương trình...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách chương trình</Text>
      <FlatList
        data={courses}
        keyExtractor={item => item.program_id?.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  courseItem: { backgroundColor: '#f3f3f3', borderRadius: 10, padding: 16, marginBottom: 12 },
  courseImage: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8, resizeMode: 'cover' },
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: '#3498ff' },
  courseDesc: { fontSize: 14, color: '#444', marginTop: 4 },
  courseMeta: { fontSize: 12, color: '#888', marginTop: 4 },
  statusText: { fontSize: 13, color: '#2ecc71', marginTop: 4, fontWeight: 'bold' },
  progressText: { fontSize: 12, color: '#888', marginTop: 2 },
});