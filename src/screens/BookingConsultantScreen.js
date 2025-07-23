import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { getConsultants } from '../utils/api';

export default function BookingConsultantScreen({ navigation }) {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConsultants()
      .then(res => {
        setConsultants(res.data?.data?.consultants || res.data?.data || []);
      })
      .catch(() => setConsultants([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (consultant) => {
    navigation.navigate('BookAppointment', { consultant });
  };

  if (loading) {
    return (
      <View style={styles.center}><ActivityIndicator size="large" color="#6C63FF" /></View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn tư vấn viên</Text>
      <FlatList
        data={consultants}
        keyExtractor={item => item.id_consultant?.toString() || item._id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.name}>{item.name || 'Tư vấn viên'}</Text>
            <Text style={styles.speciality}>{item.speciality || 'Chuyên môn'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888' }}>Không có tư vấn viên</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' },
  item: { backgroundColor: '#F5F6FF', borderRadius: 10, padding: 16, marginBottom: 12 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  speciality: { color: '#666', fontSize: 13, marginTop: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}); 