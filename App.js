import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import BookingScreen from './src/screens/BookingScreen';
import AccountScreen from './src/screens/AccountScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import BookAppointmentScreen from './src/screens/BookAppointmentScreen'; // Thêm dòng này
import BookingSlotScreen from './src/screens/BookingSlotScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import CourseLearningScreen from './src/screens/CourseLearningScreen';
import ModuleDetailScreen from './src/screens/ModuleDetailScreen';
import LessonDetailScreen from './src/screens/LessonDetailScreen';

// Dummy screens for tab
function ProfileScreen() {
  return null;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  // Số thông báo mới (có thể lấy từ context hoặc state toàn cục)
  const newNotificationCount = 2; // ví dụ tạm thời

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { 
          backgroundColor: '#fff', 
          borderTopLeftRadius: 16, 
          borderTopRightRadius: 16, 
          height: 72, // tăng chiều cao tab bar
          paddingBottom: 12, // thêm padding dưới cho icon/text
        },
        tabBarLabelStyle: {
          fontSize: 13,
          marginBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 6,
        }
      }}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Khóa học"
        component={CoursesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="bell-outline" color={color} size={size} />
              {newNotificationCount > 0 && (
                <View style={{
                  position: 'absolute',
                  right: -6,
                  top: -3,
                  backgroundColor: '#FF3B30',
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 3,
                }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                    {newNotificationCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={AccountScreen} // Thay ProfileScreen bằng AccountScreen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="Đặt lịch"
            component={BookingScreen}
            options={{ headerShown: true, title: 'Đặt lịch khám' }}
          />
          <Stack.Screen
            name="BookAppointment"
            component={BookAppointmentScreen}
            options={{ headerShown: true, title: 'Book Appointment' }}
          />
          <Stack.Screen
            name="BookingSlot"
            component={BookingSlotScreen}
            options={{ headerShown: true, title: 'Chọn khung giờ' }}
          />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={{ headerShown: true, title: 'Chi tiết khóa học' }}
          />
          <Stack.Screen
            name="CourseLearning"
            component={CourseLearningScreen}
            options={{ headerShown: true, title: 'Lộ trình học' }}
          />
          <Stack.Screen
            name="ModuleDetail"
            component={ModuleDetailScreen}
            options={{ headerShown: true, title: 'Chi tiết module' }}
          />
          <Stack.Screen
            name="LessonDetail"
            component={LessonDetailScreen}
            options={{ headerShown: true, title: 'Chi tiết bài học' }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
});
