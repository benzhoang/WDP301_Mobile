import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Dữ liệu mẫu cho danh sách khóa học tư vấn/phòng chống ma túy
export const courses = [
  {
    id: 'course1',
    title: 'Phòng tránh nghiện ma túy',
    description: 'Những kiến thức cơ bản giúp bạn và gia đình phòng tránh nguy cơ nghiện ma túy.',
    author: 'TS. Nguyễn Văn A',
    date: '2024-05-10',
    duration: '2 giờ',
    modules: [
      {
        id: 'm1',
        title: 'Nhận biết nguy cơ',
        lessons: [
          { id: 'l1', title: 'Dấu hiệu nhận biết sớm' },
          { id: 'l2', title: 'Tác động của ma túy' },
        ],
      },
      {
        id: 'm2',
        title: 'Phòng tránh cho gia đình',
        lessons: [
          { id: 'l3', title: 'Giáo dục con cái' },
          { id: 'l4', title: 'Vai trò của cha mẹ' },
        ],
      },
    ],
  },
  {
    id: 'course2',
    title: 'Tư vấn tâm lý cho người nghiện',
    description: 'Các phương pháp tư vấn tâm lý hỗ trợ người nghiện vượt qua khó khăn.',
    author: 'ThS. Trần Thị B',
    date: '2024-04-22',
    duration: '1.5 giờ',
    modules: [
      {
        id: 'm1',
        title: 'Tâm lý người nghiện',
        lessons: [
          { id: 'l1', title: 'Hiểu về tâm lý người nghiện' },
          { id: 'l2', title: 'Những khó khăn thường gặp' },
        ],
      },
      {
        id: 'm2',
        title: 'Kỹ năng tư vấn',
        lessons: [
          { id: 'l3', title: 'Lắng nghe và chia sẻ' },
          { id: 'l4', title: 'Động viên và hỗ trợ' },
        ],
      },
    ],
  },
  {
    id: 'course3',
    title: 'Hòa nhập cộng đồng sau cai nghiện',
    description: 'Hỗ trợ người nghiện tái hòa nhập cộng đồng sau điều trị.',
    author: 'PGS. Lê Văn C',
    date: '2024-03-15',
    duration: '2.5 giờ',
    modules: [
      {
        id: 'm1',
        title: 'Khó khăn khi tái hòa nhập',
        lessons: [
          { id: 'l1', title: 'Kỳ thị xã hội' },
          { id: 'l2', title: 'Tìm việc làm' },
        ],
      },
      {
        id: 'm2',
        title: 'Giải pháp hỗ trợ',
        lessons: [
          { id: 'l3', title: 'Vai trò của cộng đồng' },
          { id: 'l4', title: 'Chính sách xã hội' },
        ],
      },
    ],
  },
];

export default function CoursesScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetail', { course: item })}
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDesc}>{item.description}</Text>
      <Text style={styles.courseMeta}>Tác giả: {item.author} | Ngày đăng: {item.date} | Thời lượng: {item.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách khóa học</Text>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
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
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: '#3498ff' },
  courseDesc: { fontSize: 14, color: '#444', marginTop: 4 },
  courseMeta: { fontSize: 12, color: '#888', marginTop: 4 },
});