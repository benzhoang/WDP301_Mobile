import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const morningSlots = [
  '9:30 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'
];
const eveningSlots = [
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:30 PM', '10:00 PM', '10:30 PM'
];

export default function BookingSlotScreen({ navigation, route }) {
  const { selectedDate } = route.params;
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');

  const handleBook = () => {
    if (!selectedSlot || !name || !topic) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin và chọn khung giờ!');
      return;
    }
    const [day, month, year] = selectedDate.split('-').reverse();
    const booking = {
      id: Date.now().toString(),
      name,
      date: `${selectedDate}T${convertTo24h(selectedSlot)}`,
      topic,
      status: 'Đang chờ xác nhận',
      consultant: 'Chưa phân công',
      note: '',
    };
    navigation.navigate('Đặt lịch', { newBooking: booking });
  };

  function convertTo24h(time12h) {
    // Chuyển slot giờ 12h sang 24h (ví dụ: 7:30 PM -> 19:30:00)
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') hours = String(Number(hours) + 12);
    if (modifier === 'AM' && hours === '12') hours = '00';
    return `${hours.padStart(2, '0')}:${minutes}:00`;
  }

  const renderSlot = (slot, disabled) => (
    <TouchableOpacity
      key={slot}
      style={[styles.slot, selectedSlot === slot && styles.slotSelected, disabled && styles.slotDisabled]}
      onPress={() => !disabled && setSelectedSlot(slot)}
      disabled={disabled}
    >
      <Text style={[styles.slotText, selectedSlot === slot && { color: '#fff' }, disabled && { color: '#bbb' }]}>{slot}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn khung giờ hẹn</Text>
      <Text style={styles.label}>Appointment Date</Text>
      <Text style={styles.date}>{selectedDate.split('-').reverse().join('/')}</Text>
      <Text style={styles.label}>Morning</Text>
      <View style={styles.slotRow}>{morningSlots.map(slot => renderSlot(slot, false))}</View>
      <Text style={styles.label}>Evening</Text>
      <View style={styles.slotRow}>{eveningSlots.map(slot => renderSlot(slot, false))}</View>
      <Text style={styles.label}>Họ và tên</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nhập họ và tên" />
      <Text style={styles.label}>Chủ đề tư vấn</Text>
      <TextInput style={styles.input} value={topic} onChangeText={setTopic} placeholder="Nhập chủ đề tư vấn" />
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
  date: { fontSize: 16, color: '#222', marginBottom: 8 },
  slotRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  slot: { borderWidth: 1, borderColor: '#3498ff', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14, margin: 4 },
  slotSelected: { backgroundColor: '#3498ff', borderColor: '#3498ff' },
  slotDisabled: { backgroundColor: '#eee', borderColor: '#eee' },
  slotText: { color: '#3498ff', fontWeight: 'bold' },
  input: { backgroundColor: '#F3F3F3', borderRadius: 8, padding: 10, fontSize: 15, marginBottom: 4, marginTop: 4 },
  button: { backgroundColor: '#3498ff', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 