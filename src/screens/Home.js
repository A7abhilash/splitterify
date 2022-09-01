import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {colors, fonts} from '../styles';
import MyUserGroups from '../components/home/MyUserGroups';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const {user} = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Welcome {user?.userName}</Text>
        <Text style={styles.headerCaption}>
          Split the bill among friends going on vacation/outing.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
          <View style={styles.showUpiID}>
            <View>
              <Text style={styles.upiTextLabel}>My UPI ID (VPA):</Text>
            </View>
            <View>
              <Text
                style={{
                  ...styles.upiTextValue,
                  color: user?.vpa ? colors.Primary : colors.Danger,
                }}>
                {user?.vpa ? user?.vpa : 'Tap to set'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <MyUserGroups />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    borderRadius: 20,
    backgroundColor: 'lightblue',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 23,
    fontFamily: fonts.PoppinsSemiBold,
  },
  headerCaption: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: fonts.PoppinsLight,
  },
  showUpiID: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    backgroundColor: colors.Light,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  upiTextLabel: {
    color: colors.Dark,
    fontFamily: fonts.PoppinsMedium,
  },
  upiTextValue: {
    fontFamily: fonts.PoppinsLight,
  },
});
