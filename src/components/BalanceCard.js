import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard({ label, value, desc }) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>{label}</Text>
      <Text style={styles.balanceValue}>{value}</Text>
      <Text style={styles.balanceDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: { backgroundColor: '#fff', marginHorizontal: 24, borderRadius: 16, padding: 24, alignItems: 'center', marginTop: -20, elevation: 2 },
  balanceLabel: { color: '#888', fontSize: 16 },
  balanceValue: { color: '#6C63FF', fontSize: 36, fontWeight: 'bold', marginVertical: 4 },
  balanceDesc: { color: '#aaa', fontSize: 14 },
});