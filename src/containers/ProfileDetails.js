import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../styles';
import IdenticonAvatar from './IdenticonAvatar';

export default function ProfileDetails({user}) {
  return (
    <View style={{padding: 10}}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <IdenticonAvatar
          text={user.email || user.userName + '1234567890'}
          size={100}
        />
      </View>
      <View>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>User Name</Text>
          <Text style={styles.textInput}>{user.userName}</Text>
        </View>
        {user.email && (
          <View style={styles.textInputGroup}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.textInput}>{user.email}</Text>
          </View>
        )}
        {user.phoneNo && (
          <View style={styles.textInputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.textInput}>{user.phoneNo}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputGroup: {
    marginVertical: 5,
  },
  label: {
    fontFamily: fonts.PoppinsLight,
    fontSize: 10,
  },
  textInput: {
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 5,
    borderColor: '#121212',
    borderWidth: 0.5,
    fontFamily: fonts.PoppinsMedium,
  },
});
