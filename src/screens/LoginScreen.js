  import React, { useState } from 'react';
  import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
  import { login } from '../utils/api';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Lấy callback từ AccountScreen nếu có
    const onLoginSuccess = route?.params?.onLoginSuccess;

    const handleLogin = async () => {
      setLoading(true);
      try {
        const res = await login(email, password);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        await AsyncStorage.setItem('token', res.data.token);
        if (onLoginSuccess) onLoginSuccess(res.data.user, res.data.token);
        Alert.alert('Đăng nhập thành công');
        navigation.navigate('MainTabs', { screen: 'Home' }); // Chuyển về tab Home
      } catch (err) {
        Alert.alert('Đăng nhập thất bại', err?.response?.data?.message || 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>Đăng nhập</Text>
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
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 24, padding: 12 }}
        />
        <TouchableOpacity style={{ backgroundColor: '#6C63FF', borderRadius: 8, padding: 16 }} onPress={handleLogin} disabled={loading}>
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#6C63FF', textAlign: 'center' }}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
  );
} 