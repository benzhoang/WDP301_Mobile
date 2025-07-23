import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getConsultantSlots, createBooking } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingSlotScreen({ navigation, route }) {
  const { selectedDate, consultant } = route.params;
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!consultant?.id_consultant && !consultant?._id) {
      Alert.alert('Lỗi', 'Không tìm thấy tư vấn viên');
      navigation.goBack();
      return;
    }
    getConsultantSlots(consultant.id_consultant || consultant._id)
      .then(res => {
        setSlots(res.data?.data || []);
      })
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  }, [consultant]);

  const handleBook = async () => {
    if (!selectedSlot) {
      Alert.alert('Vui lòng chọn khung giờ!');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Bạn cần đăng nhập để đặt lịch!');
        return;
      }
      const data = {
        consultant_id: consultant.id_consultant || consultant._id,
        slot_id: selectedSlot.slot_id,
        booking_date: selectedDate,
      };
      const res = await createBooking(token, data);
      if (res.data?.success) {
        Alert.alert('Đặt lịch thành công!');
        navigation.navigate('Đặt lịch');
      } else {
        Alert.alert('Đặt lịch thất bại', res.data?.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      Alert.alert('Lỗi', err?.response?.data?.message || err.message || 'Không thể đặt lịch');
    }
  };

  const renderSlot = (slot) => (
    <TouchableOpacity
      key={slot.slot_id}
      style={[styles.slot, selectedSlot?.slot_id === slot.slot_id && styles.slotSelected]}
      onPress={() => setSelectedSlot(slot)}
    >
      <Text style={[styles.slotText, selectedSlot?.slot_id === slot.slot_id && { color: '#fff' }]}>
        {slot.start_time?.slice(0,5)} - {slot.end_time?.slice(0,5)}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#3498ff" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn khung giờ hẹn</Text>
      <Text style={styles.label}>Ngày hẹn: {selectedDate.split('-').reverse().join('/')}</Text>
      <View style={styles.slotRow}>
        {slots.length > 0 ? slots.map(renderSlot) : <Text style={{ color: '#888' }}>Không có slot khả dụng</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBook}>
        <Text style={styles.buttonText}>Đặt lịch hẹn</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 14, color: '#444', marginTop: 16, marginBottom: 4 },
  slotRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  slot: { borderWidth: 1, borderColor: '#3498ff', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14, margin: 4 },
  slotSelected: { backgroundColor: '#3498ff', borderColor: '#3498ff' },
  slotText: { color: '#3498ff', fontWeight: 'bold' },
  button: { backgroundColor: '#3498ff', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}); 