import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { register } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation, onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không khớp');
      return;
    }
    setLoading(true);
    try {
      const res = await register(email, password, 'member');
      // Lưu user và token vào AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      await AsyncStorage.setItem('token', res.data.token);
      if (onRegisterSuccess) onRegisterSuccess(res.data.user, res.data.token);
      Alert.alert('Đăng ký thành công');
      // navigation.goBack(); // hoặc chuyển sang trang chính
    } catch (err) {
      Alert.alert('Đăng ký thất bại', err?.response?.data?.message || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>Đăng ký</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16, padding: 12 }}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16, padding: 12 }}
      />
      <TextInput
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 24, padding: 12 }}
      />
      <TouchableOpacity style={{ backgroundColor: '#6C63FF', borderRadius: 8, padding: 16 }} onPress={handleRegister} disabled={loading}>
        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{loading ? 'Đang đăng ký...' : 'Đăng ký'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#6C63FF', textAlign: 'center' }}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
