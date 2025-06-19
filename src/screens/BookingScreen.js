import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, FlatList, LayoutAnimation, UIManager } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Kích hoạt LayoutAnimation cho Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // Danh sách lịch tư vấn đã đặt (giả lập)
  const [bookings, setBookings] = useState([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      date: new Date('2025-06-20T09:00:00'),
      topic: 'Tư vấn tâm lý',
      status: 'Đang chờ xác nhận',
      consultant: 'Nguyễn Thị B',
      note: 'Mang theo hồ sơ bệnh án nếu có.',
    },
    {
      id: '2',
      name: 'Nguyễn Văn A',
      date: new Date('2025-06-18T14:00:00'),
      topic: 'Tư vấn cai nghiện',
      status: 'Đã xác nhận',
      consultant: 'Trần Văn C',
      note: 'Đến sớm 10 phút trước giờ hẹn.',
    },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const handleBooking = () => {
    if (!name || !phone || !topic) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    const newBooking = {
      id: Date.now().toString(),
      name,
      date,
      topic,
      status: 'Đang chờ xác nhận',
      consultant: 'Chưa phân công',
      note: '',
    };
    setBookings([newBooking, ...bookings]);
    setName('');
    setPhone('');
    setTopic('');
    setDate(new Date());
    alert('Đặt lịch tư vấn thành công!');
  };

  const handleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExpand(item.id)} activeOpacity={0.8}>
      <View style={styles.bookingItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bookingDate}>
            {item.date.toLocaleDateString()} {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text style={styles.bookingReason}>{item.topic}</Text>
        </View>
        <Text style={[
          styles.bookingStatus,
          item.status === 'Đã xác nhận' ? { color: '#4FC3F7' } : { color: '#FFB300' }
        ]}>
          {item.status}
        </Text>
      </View>
      {expandedId === item.id && (
        <View style={styles.bookingDetail}>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Họ và tên:</Text> {item.name}</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Nhân viên tư vấn:</Text> {item.consultant}</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Ghi chú:</Text> {item.note || 'Không có'}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Phần header (form đặt lịch)
  const renderHeader = () => (
    <View>
      <Text style={styles.header}>Đặt lịch tư vấn</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Chủ đề tư vấn</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Nhập chủ đề tư vấn"
          value={topic}
          onChangeText={setTopic}
          multiline
        />

        <Text style={styles.label}>Chọn ngày tư vấn</Text>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowDate(true)}>
          <Text style={{ color: '#222' }}>
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Đặt lịch tư vấn</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Lịch tư vấn đã đặt</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      data={bookings}
      keyExtractor={item => item.id}
      renderItem={renderBookingItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 16 }}>Chưa có lịch tư vấn nào</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FF', paddingTop: 32 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 24, marginBottom: 20 },
  form: { backgroundColor: '#fff', marginHorizontal: 24, borderRadius: 16, padding: 20, elevation: 2 },
  label: { fontSize: 15, color: '#444', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#F3F3F3', borderRadius: 8, padding: 10, fontSize: 15, marginBottom: 4 },
  datePicker: { backgroundColor: '#F3F3F3', borderRadius: 8, padding: 12, marginBottom: 8 },
  button: { backgroundColor: '#6C63FF', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subHeader: { fontSize: 17, fontWeight: 'bold', color: '#333', marginLeft: 24, marginTop: 32, marginBottom: 12 },
  bookingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 14, marginHorizontal: 24, marginBottom: 4, elevation: 1 },
  bookingDate: { fontWeight: 'bold', color: '#222', fontSize: 15 },
  bookingReason: { color: '#666', fontSize: 13, marginTop: 2 },
  bookingStatus: { fontWeight: 'bold', fontSize: 13, marginLeft: 12 },
  bookingDetail: { backgroundColor: '#F8F8FF', marginHorizontal: 32, marginBottom: 10, borderRadius: 8, padding: 10 },
  detailLabel: { fontWeight: 'bold', color: '#333' },
  detailText: { color: '#444', fontSize: 14, marginBottom: 4 },
});