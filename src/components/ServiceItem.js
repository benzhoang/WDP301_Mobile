import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ServiceItem({ icon, color, label, onPress }) {
  return (
    <TouchableOpacity style={[styles.serviceItem, { backgroundColor: color + '22' }]} onPress={onPress}>
      <Icon name={icon} size={28} color={color} />
      <Text style={styles.serviceText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  serviceItem: { width: '22%', aspectRatio: 1, borderRadius: 16, alignItems: 'center', justifyContent: 'center', margin: 8 },
  serviceText: { fontSize: 12, color: '#333', marginTop: 6, textAlign: 'center' },
});