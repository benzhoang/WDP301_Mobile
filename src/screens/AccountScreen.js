import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/AccountScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);

  // Tự động lấy user từ AsyncStorage khi mở màn hình
  useEffect(() => {
    const fetchUser = async () => {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) setUser(JSON.parse(userStr));
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    // Chỉ hiện đăng nhập/đăng ký khi chưa đăng nhập
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Icon name="account-circle" size={64} color="#fff" />
          </View>
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login', { onLoginSuccess: setUser })}>
              <Text style={styles.loginBtnText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Register', { onRegisterSuccess: setUser })}>
              <Text style={styles.registerBtnText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Đã đăng nhập: hiện đầy đủ chức năng
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerLoggedIn}>
        <Icon name="account-circle" size={64} color="#fff" />
        <Text style={styles.loggedInName}>Xin chào, {user.name || user.email}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {/* Các tiện ích và chức năng */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lịch sử đặt lịch</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Xem tất cả {'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderRow}>
          <View style={styles.orderItem}>
            <Icon name="calendar-clock" size={28} color="#6C63FF" />
            <Text style={styles.orderLabel}>Chờ xác nhận</Text>
          </View>
          <View style={styles.orderItem}>
            <Icon name="calendar-check" size={28} color="#6C63FF" />
            <Text style={styles.orderLabel}>Đã xác nhận</Text>
          </View>
          <View style={styles.orderItem}>
            <Icon name="calendar-remove" size={28} color="#6C63FF" />
            <Text style={styles.orderLabel}>Đã hủy</Text>
          </View>
          <View style={styles.orderItem}>
            <Icon name="star-outline" size={28} color="#6C63FF" />
            <Text style={styles.orderLabel}>Đánh giá</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tiện ích học tập</Text>
        <View style={styles.utilityRow}>
          <View style={styles.utilityItem}>
            <Icon name="book-open-page-variant" size={28} color="#6C63FF" />
            <Text style={styles.utilityLabel}>Khóa học</Text>
            <Text style={styles.utilitySubLabel}>Khám phá các khóa học</Text>
          </View>
          <View style={styles.utilityItem}>
            <Icon name="calendar-multiselect" size={28} color="#6C63FF" />
            <Text style={styles.utilityLabel}>Lịch học</Text>
            <Text style={styles.utilitySubLabel}>Xem lịch học của bạn</Text>
          </View>
          <View style={styles.utilityItem}>
            <Icon name="file-document-outline" size={28} color="#6C63FF" />
            <Text style={styles.utilityLabel}>Tài liệu</Text>
            <Text style={styles.utilitySubLabel}>Tài liệu học tập</Text>
          </View>
          <View style={styles.utilityItem}>
            <Icon name="account-group-outline" size={28} color="#6C63FF" />
            <Text style={styles.utilityLabel}>Cộng đồng</Text>
            <Text style={styles.utilitySubLabel}>Tham gia cộng đồng</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tiện ích khác</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Xem tất cả {'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherRow}>
          <View style={styles.otherItem}>
            <Icon name="account-cog-outline" size={28} color="#6C63FF" />
            <Text style={styles.otherLabel}>Cài đặt tài khoản</Text>
          </View>
          <View style={styles.otherItem}>
            <Icon name="shield-check-outline" size={28} color="#6C63FF" />
            <Text style={styles.otherLabel}>Bảo mật</Text>
          </View>
          <View style={styles.otherItem}>
            <Icon name="help-circle-outline" size={28} color="#6C63FF" />
            <Text style={styles.otherLabel}>Trợ giúp</Text>
          </View>
          <View style={styles.otherItem}>
            <Icon name="file-document-edit-outline" size={28} color="#6C63FF" />
            <Text style={styles.otherLabel}>Điều khoản sử dụng</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}