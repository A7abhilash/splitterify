// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  TextInput,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import {colors, fonts} from '../styles';
import icons from '../../assets/icons';

const SignUp = () => {
  const {setAlert} = useMsg();
  const {signUp} = useAuth();
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vpa, setVpa] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handlePress = async () => {
    if (
      userName.trim() &&
      email.trim() &&
      password.trim() &&
      phoneNo.trim() &&
      vpa.trim()
    ) {
      Keyboard.dismiss();
      setLoading(true);
      await signUp(userName, email, password, phoneNo, vpa);
      setLoading(false);
    } else {
      setAlert({
        title: 'Invalid',
        msg: 'No blanks field allowed',
        text: 'Understood',
      });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <Image
            source={icons.welcome}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
        <View>
          <View style={styles.textInputGroup}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              placeholder="Enter your user name"
              value={userName}
              onChangeText={text => setUserName(text)}
              style={styles.textInput}
            />
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={phoneNo}
                onChangeText={text => setPhoneNo(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>Virtual Payment Address</Text>
              <TextInput
                placeholder="Enter your VPA"
                value={vpa}
                onChangeText={text => setVpa(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email address"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                placeholder="Enter new password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.textInput}
                secureTextEntry
              />
            </View>
          </View>
          <View>
            <View>
              <TouchableOpacity
                disabled={loading}
                onPress={handlePress}
                style={styles.btn}>
                <Text style={styles.btnText}>SIGN UP</Text>
              </TouchableOpacity>
              {loading && (
                <Text style={styles.label}>
                  Please wait while we sign you up with Splitterify...
                </Text>
              )}
            </View>
          </View>
        </View>
        <Text style={styles.label}>Already have an account?</Text>
        <View style={styles.bottomView}>
          <TouchableOpacity
            disabled={loading}
            onPress={() => navigation.replace('SignIn')}>
            <Text style={{...styles.label, color: colors.Primary}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  bottomView: {
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: 'rbga(0,0,0,0.4)',
    paddingTop: 10,
  },
});
