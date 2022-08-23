import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IdenticonAvatar from './IdenticonAvatar';
import {fonts} from '../styles';

export default function AvatarName({text, name}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{paddingBottom: 5}}>
        <IdenticonAvatar text={text} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
  },
});
