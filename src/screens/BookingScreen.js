import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMyBookings } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function BookingScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return setBookings([]);
      const res = await getMyBookings(token);
      setBookings(res.data?.data || []);
    } catch {
      setBookings([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBookings().finally(() => setRefreshing(false));
  }, []);

  const markedDates = bookings.reduce((acc, item) => {
    const dateStr = (item.booking_date || item.date || '').split('T')[0];
    if (dateStr) acc[dateStr] = { marked: true, dotColor: '#6C63FF' };
    return acc;
  }, {});
  if (selectedDate) {
    markedDates[selectedDate] = { ...(markedDates[selectedDate] || {}), selected: true, selectedColor: '#3498ff' };
  }

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleExpand(item.booking_id || item.id)} activeOpacity={0.8}>
      <View style={styles.bookingItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bookingDate}>
            {new Date(item.booking_date || item.date).toLocaleDateString()} {item.slot_time ? `${item.slot_time.start_time} - ${item.slot_time.end_time}` : ''}
          </Text>
          <Text style={styles.bookingReason}>{item.consultant_name || item.consultant || 'Tư vấn viên'}</Text>
        </View>
        <Text style={[
          styles.bookingStatus,
          item.status === 'Đã xác nhận' || item.status === 'Xác nhận thành công' ? { color: '#4FC3F7' } : { color: '#FFB300' }
        ]}>
          {item.status}
        </Text>
      </View>
      {expandedId === (item.booking_id || item.id) && (
        <View style={styles.bookingDetail}>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Tư vấn viên:</Text> {item.consultant_name || item.consultant || 'Tư vấn viên'}</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Ghi chú:</Text> {item.notes || item.note || 'Không có'}</Text>
          {item.google_meet_link ? (
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Google Meet:</Text> {item.google_meet_link}</Text>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch tư vấn</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          minDate={formattedToday}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#3498ff',
            todayTextColor: '#3498ff',
            arrowColor: '#3498ff',
            dotColor: '#6C63FF',
          }}
          style={styles.calendar}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('BookingConsultant')}> 
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Đặt lịch mới</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Danh sách lịch đã đặt</Text>
      <FlatList
        data={bookings}
        keyExtractor={item => (item.booking_id || item.id)?.toString()}
        renderItem={renderBookingItem}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 16 }}>Chưa có lịch tư vấn nào</Text>}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FF', paddingTop: 32 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 24, marginBottom: 20 },
  calendarContainer: { backgroundColor: '#fff', marginHorizontal: 24, borderRadius: 16, padding: 20, elevation: 2, marginBottom: 16 },
  calendar: { borderRadius: 8, marginTop: 8, marginBottom: 8, elevation: 1 },
  addButton: { flexDirection: 'row', backgroundColor: '#6C63FF', borderRadius: 8, padding: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  subHeader: { fontSize: 17, fontWeight: 'bold', color: '#333', marginLeft: 24, marginTop: 12, marginBottom: 12 },
  bookingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 14, marginHorizontal: 24, marginBottom: 4, elevation: 1 },
  bookingDate: { fontWeight: 'bold', color: '#222', fontSize: 15 },
  bookingReason: { color: '#666', fontSize: 13, marginTop: 2 },
  bookingStatus: { fontWeight: 'bold', fontSize: 13, marginLeft: 12 },
  bookingDetail: { backgroundColor: '#F8F8FF', marginHorizontal: 32, marginBottom: 10, borderRadius: 8, padding: 10 },
  detailLabel: { fontWeight: 'bold', color: '#333' },
  detailText: { color: '#444', fontSize: 14, marginBottom: 4 },
});