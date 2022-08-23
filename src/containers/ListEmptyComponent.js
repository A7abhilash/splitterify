import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../styles';

export default function ListEmptyComponent({text}) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.PoppinsLight,
    fontSize: 10,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
});
