import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function BookAppointmentScreen({ navigation, route }) {

  const { consultant } = route.params || {};
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const handleDayPress = (day) => {
    navigation.replace('BookingSlot', { selectedDate: day.dateString, consultant });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn ngày đặt lịch</Text>
      <Calendar
        minDate={formattedToday}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: '#3498ff',
          todayTextColor: '#3498ff',
          arrowColor: '#3498ff',
        }}
        style={styles.calendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 40 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  calendar: { borderRadius: 8, marginTop: 8, marginBottom: 16, elevation: 1 },
}); 