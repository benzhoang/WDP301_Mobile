import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';

const courses = [
  {
    id: '1',
    title: 'Phòng tránh nghiện ma túy',
    desc: 'Những kiến thức cơ bản giúp bạn và gia đình phòng tránh nguy cơ nghiện ma túy.',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Nhận biết dấu hiệu sử dụng ma túy',
    desc: 'Các dấu hiệu nhận biết sớm người thân có thể sử dụng ma túy.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Hỗ trợ điều trị cho bệnh nhân nghiện',
    desc: 'Các phương pháp hỗ trợ và điều trị cho người nghiện ma túy.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    title: 'Tư vấn tâm lý cho người nghiện',
    desc: 'Vai trò của tư vấn tâm lý trong quá trình điều trị nghiện ma túy.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '5',
    title: 'Hòa nhập cộng đồng sau cai nghiện',
    desc: 'Hỗ trợ người nghiện tái hòa nhập cộng đồng sau điều trị.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

function CourseItem({ title, desc, image }) {
  return (
    <TouchableOpacity style={styles.courseItem}>
      <Image source={{ uri: image }} style={styles.courseImage} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseDesc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function CoursesScreen() {
  const [search, setSearch] = useState('');
  const filteredCourses = courses.filter(
    c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.header}>Khóa học phòng tránh & điều trị ma túy</Text>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Tìm kiếm khóa học..." />
      {filteredCourses.map(course => (
        <CourseItem
          key={course.id}
          title={course.title}
          desc={course.desc}
          image={course.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FF', paddingTop: 32 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 24, marginBottom: 20 },
  courseItem: { flexDirection: 'row', alignItems: 'flex-start', marginHorizontal: 24, marginBottom: 18, backgroundColor: '#fff', borderRadius: 12, padding: 12, elevation: 1 },
  courseImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee' },
  courseTitle: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  courseDesc: { color: '#666', fontSize: 13, marginTop: 4 },
});