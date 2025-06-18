import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const handleBooking = () => {
    // Xử lý đặt lịch ở đây (gửi API, thông báo, ...)
    alert('Đặt lịch thành công!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.header}>Đặt lịch khám</Text>
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

        <Text style={styles.label}>Lý do khám</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Nhập lý do khám"
          value={reason}
          onChangeText={setReason}
          multiline
        />

        <Text style={styles.label}>Chọn ngày khám</Text>
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
          <Text style={styles.buttonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
});