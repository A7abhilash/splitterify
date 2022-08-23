import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAuth} from '../contexts/AuthContext';
import {colors, fonts} from '../styles';
import ProfileDetails from '../containers/ProfileDetails';

export default function Profile() {
  const {user, signOut} = useAuth();

  return (
    <View style={styles.container}>
      <ProfileDetails user={user} />
      <View
        style={{
          marginVertical: 5,
        }}>
        <TouchableOpacity onPress={signOut} style={styles.btn}>
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.Light,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: colors.Danger,
    borderRadius: 10,
    paddingVertical: 5,
    width: '40%',
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.Light,
  },
});
