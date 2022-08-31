// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import icons from '../../assets/icons';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import {colors, fonts} from '../styles';

const SignIn = () => {
  const {setAlert} = useMsg();
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handlePress = async () => {
    // console.log("Signed in");
    // console.log(email, password);
    if (email && password) {
      Keyboard.dismiss();
      await signIn(email, password);
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
            source={icons.hello}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
        <View>
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
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.textInput}
              secureTextEntry
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handlePress} style={styles.btn}>
            <Text style={styles.btnText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.label}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={{...styles.label, color: colors.Primary}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Light,
    justifyContent: 'center',
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
