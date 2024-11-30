import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ label, selected, onPress, icon }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={selected ? require('../assets/radio-checked.png') : require('../assets/radio-unchecked.png')}
        style={styles.radio}
      />
      <Text style={styles.label}>{label}</Text>
      <Image source={icon} style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radio: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});