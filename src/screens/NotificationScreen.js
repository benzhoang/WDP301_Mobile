import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Bạn có lịch học mới', isNew: true, detail: 'Bạn vừa được thêm vào lịch học Toán lúc 8h sáng.', targetScreen: 'Schedule' },
    { id: '2', title: 'Cập nhật điều khoản sử dụng', isNew: true, detail: 'Điều khoản sử dụng đã được cập nhật vào ngày 19/6/2025.', targetScreen: 'Terms' },
    { id: '3', title: 'Chào mừng bạn đến với SchoolCare!', isNew: false, detail: 'Cảm ơn bạn đã đăng ký tài khoản.', targetScreen: 'Home' },
  ]);
  const [expandedId, setExpandedId] = useState(null);

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleNavigate = (screen) => {
    if (navigation && screen) navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông báo</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={[styles.item, item.isNew && styles.newItem]}
              onPress={() => handlePress(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.itemText}>{item.title}</Text>
              {item.isNew && <View style={styles.dot} />}
            </TouchableOpacity>
            {expandedId === item.id && (
              <View style={styles.detailBox}>
                <Text style={styles.detailText}>{item.detail}</Text>
                <TouchableOpacity onPress={() => handleNavigate(item.targetScreen)}>
                  <Text style={styles.link}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    // Shadow mạnh hơn
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,      // tăng opacity
    shadowRadius: 10,         // tăng radius
    elevation: 8,             // tăng elevation cho Android
    marginBottom: 2,
  },
  newItem: {
    backgroundColor: '#F3F0FF',
  },
  itemText: { flex: 1, fontSize: 16 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C63FF',
    marginLeft: 8,
  },
  detailBox: {
    backgroundColor: '#F8F8FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  link: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});