import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PromoCard({ title, desc }) {
  return (
    <View style={styles.promoCard}>
      <Text style={styles.promoTitle}>{title}</Text>
      <Text style={styles.promoDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  promoCard: { backgroundColor: '#F3EFFF', margin: 24, borderRadius: 16, padding: 20, alignItems: 'flex-start' },
  promoTitle: { fontWeight: 'bold', fontSize: 16, color: '#6C63FF' },
  promoDesc: { color: '#555', marginTop: 6, fontSize: 14 },
});