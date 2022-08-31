import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import {fonts} from '../styles';

export default function GuestStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      animation="fade"
      screenOptions={{
        // headerShown: false,
        headerTitleStyle: {
          fontFamily: fonts.PoppinsSemiBold,
        },
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: 'Sign In to Splitterify',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: 'Sign Up with Splitterify',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
