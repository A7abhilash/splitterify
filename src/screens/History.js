import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function History() {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
