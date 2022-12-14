import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import PendingPayments from '../screens/PendingPayments';
import History from '../screens/History';
import Profile from '../screens/Profile';
import icons from '../../assets/icons';
import {colors, fonts} from '../styles';

export default function HomeTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontFamily: fonts.PoppinsSemiBold,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Splitterify',
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.home}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? colors.Primary : colors.Dark,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pending"
        component={PendingPayments}
        options={{
          headerTitle: 'Payment Pending',
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.pending}
              style={{
                width: 23,
                height: 23,
                tintColor: focused ? colors.Primary : colors.Dark,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerTitle: 'Payment History',
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.transaction}
              style={{
                width: 23,
                height: 23,
                tintColor: focused ? colors.Primary : colors.Dark,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.profile}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? colors.Primary : colors.Dark,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
