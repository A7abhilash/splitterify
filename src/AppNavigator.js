import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from './contexts/AuthContext';
import GuestStack from './navigation/GuestStack';
import AuthStack from './navigation/AuthStack';

export default function AppNavigator() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {!isAuthenticated ? <GuestStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
