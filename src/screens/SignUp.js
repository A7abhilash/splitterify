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
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';

const SignUp = () => {
  const {setAlert} = useMsg();
  const {signUp} = useAuth();
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vpa, setVpa] = useState('')

  const navigation = useNavigation();

  const handlePress = async () => {
    if (userName.trim() && email.trim() && password.trim() && phoneNo.trim() && vpa.trim()) {
      Keyboard.dismiss();
      await signUp(userName, email, password, phoneNo, vpa);
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
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <View>
          <TextInput
            placeholder="Username"
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Virtual Payment Address"
            value={vpa}
            onChangeText={text => setVpa(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={handlePress}
            style={styles.btn}
            title="Sign Up"
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  card: {
    paddingVertical: 20,
  },
  title: {
    color: 'purple',
    fontSize: 25,
    textAlign: 'center',
  },
  btn: {
    flex: 1,
  },
  input: {
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#121212',
    borderWidth: 0.5,
  },
});
