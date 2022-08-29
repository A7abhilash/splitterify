import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabNavigator from './HomeTabNavigator';
import BillGroup from '../screens/BillGroup';
import {fonts} from '../styles';

export default function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: fonts.PoppinsSemiBold,
        },
      }}>
      <Stack.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BillGroup"
        component={BillGroup}
        options={{
          headerTitle: 'Group Details',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
