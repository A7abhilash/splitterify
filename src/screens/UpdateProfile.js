import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, fonts} from '../styles';
import {BACKEND_URL} from '../utils';

export default function UpdateProfile() {
  const {setToast, setAlert} = useMsg();
  const {user, setUser} = useAuth();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [vpa, setVpa] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const setInitialData = () => {
    setUserName(user?.userName || '');
    setEmail(user?.email || '');
    setPhoneNo(user?.phoneNo.toString() || '');
    setVpa(user?.vpa || '');

    setCurrentPassword('');
    setNewPassword('');
  };

  useEffect(() => {
    if (user) {
      setInitialData();
    }
  }, [user]);

  const updateProfile = async () => {
    if (!currentPassword) {
      setAlert({
        title: 'Required',
        msg: 'Enter your current password',
        text: 'Ok',
      });
      return;
    }
    try {
      const profile = {
        userName: userName.trim() ? userName : user.userName,
        email: email.trim() ? email : user.email,
        phoneNo: phoneNo.trim() ? phoneNo : user.phoneNo,
        vpa: vpa.trim() ? vpa : user.vpa,
        password: newPassword.trim() ? newPassword : currentPassword,
        currentPassword,
      };

      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/auth/user', {
        method: 'PATCH',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(profile),
      });
      const data = await res.json();

      if (data.success) {
        // console.log('NEW USER: ', data.user);
        setUser(data.user);
        await AsyncStorage.setItem('token', data.token);
        setCurrentPassword('');
        setNewPassword('');
      }
      setToast(data.msg);
    } catch (error) {
      console.log(error);
      setToast('Something went wrong. Please try again later!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>User Name</Text>
          <TextInput
            placeholder="Enter your user name"
            value={userName}
            onChangeText={setUserName}
            style={styles.textInput}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="number-pad"
            value={phoneNo}
            onChangeText={setPhoneNo}
            style={styles.textInput}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>Virtual Payment Address</Text>
          <TextInput
            placeholder="Enter your VPA"
            value={vpa}
            onChangeText={setVpa}
            style={styles.textInput}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            placeholder="Enter current password (Required)"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.textInput}
            secureTextEntry
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.textInput}
            secureTextEntry
          />
          <Text
            style={{
              ...styles.label,
              fontSize: 8,
              fontFamily: fonts.PoppinsItalic,
              color: colors.Danger,
            }}>
            *Leave blank if you do not wish to change your password now.
          </Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={setInitialData}
            style={{...styles.btn, backgroundColor: colors.Danger}}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={updateProfile} style={styles.btn}>
            <Text style={styles.btnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.Light,
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
  btn: {
    backgroundColor: colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
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
