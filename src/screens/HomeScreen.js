import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BalanceCard from '../components/BalanceCard';
import QuickActionButton from '../components/QuickActionButton';
import ServiceItem from '../components/ServiceItem';

const services = [
  { name: 'Đặt lịch tư vấn', icon: 'calendar-check', color: '#FFB300' },
  { name: 'Tư vấn bác sĩ', icon: 'doctor', color: '#4FC3F7' },
  { name: 'Kết quả kiểm tra', icon: 'file-document', color: '#81C784' },
  { name: 'Mua thuốc', icon: 'pill', color: '#BA68C8' },
  { name: 'Thanh toán', icon: 'credit-card', color: '#FF8A65' },
  { name: 'Hồ sơ sức khỏe', icon: 'account-heart', color: '#64B5F6' },
];

const blogs = [
  {
    id: '1',
    title: '5 cách chăm sóc sức khỏe mùa hè',
    desc: 'Những lưu ý quan trọng giúp bạn và gia đình luôn khỏe mạnh trong mùa hè.',
    image: '',
  },
  {
    id: '2',
    title: 'Dinh dưỡng hợp lý cho trẻ nhỏ',
    desc: 'Chia sẻ bí quyết xây dựng chế độ ăn uống khoa học cho trẻ.',
    image: '',
  },
  {
    id: '3',
    title: 'Tập thể dục đúng cách mỗi ngày',
    desc: 'Hướng dẫn các bài tập phù hợp cho mọi lứa tuổi giúp nâng cao sức khỏe.',
    image: '',
  },
  {
    id: '4',
    title: 'Phòng tránh bệnh cảm cúm',
    desc: 'Các biện pháp đơn giản giúp bạn phòng tránh cảm cúm hiệu quả.',
    image: '',
  },
  {
    id: '5',
    title: 'Giấc ngủ và sức khỏe tinh thần',
    desc: 'Tầm quan trọng của giấc ngủ đối với sức khỏe tâm thần và thể chất.',
    image: '',
  },
  {
    id: '6',
    title: 'Uống nước đúng cách',
    desc: 'Lời khuyên về việc uống nước đủ và đúng cách mỗi ngày.',
    image: '',
  },
  {
    id: '7',
    title: 'Chăm sóc sức khỏe người cao tuổi',
    desc: 'Những lưu ý quan trọng khi chăm sóc sức khỏe cho người lớn tuổi.',
    image: '',
  },
];

function BlogItem({ title, desc, image }) {
  return (
    <View style={styles.blogItem}>
      <View style={styles.blogImage} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.blogTitle}>{title}</Text>
        <Text style={styles.blogDesc}>{desc}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.avatar} />
          <Text style={styles.greeting}>Xin chào, Minh!</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bell-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <BalanceCard label="Điểm kiểm tra" value="10" desc="Cập nhật kiểm tra lần cuối" />

      {/* Dịch vụ y tế */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Dịch vụ y tế</Text>
        <View style={styles.serviceGrid}>
          {services.map((item, idx) => (
            <ServiceItem
              key={idx}
              icon={item.icon}
              color={item.color}
              label={item.name}
              onPress={() => {
                if (item.name === 'Đặt lịch tư vấn') {
                  navigation.navigate('Đặt lịch');
                }
              }}
            />
          ))}
        </View>
      </View>

      {/* Blog sức khỏe - NỀN TÍM, KHÔNG NẰM TRONG VIEW TRẮNG */}
      <View style={styles.blogSection}>
        <Text style={styles.sectionTitleBlog}>Blog sức khỏe</Text>
        {blogs.map(item => (
          <BlogItem key={item.id} title={item.title} desc={item.desc} image={item.image} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6C63FF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 48 },
  profile: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, borderWidth: 2, borderColor: '#fff', backgroundColor: 'transparent' },
  greeting: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  servicesSection: { backgroundColor: '#fff', borderRadius: 32, paddingTop: 24, paddingBottom: 8, marginTop: 16, marginHorizontal: 10, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 24, marginBottom: 12, color: '#222' },
  sectionTitleBlog: { fontSize: 18, fontWeight: 'bold', marginLeft: 24, marginBottom: 12, color: '#fff', marginTop: 24 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  blogSection: { backgroundColor: 'transparent', paddingTop: 8, paddingBottom: 8 },
  blogItem: { flexDirection: 'row', alignItems: 'flex-start', marginHorizontal: 24, marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, padding: 10 },
  blogImage: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#eee' },
  blogTitle: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  blogDesc: { color: '#666', fontSize: 13, marginTop: 2 },
});