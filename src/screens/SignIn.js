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
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';

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
      <View style={styles.card}>
        {/* <Card.Title title="Welcome User" subtitle="Card Subtitle" /> */}
        <Text style={styles.title}>Sign In</Text>
        <View>
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
            title="Sign In"
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

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
