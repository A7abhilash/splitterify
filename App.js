import {StyleSheet} from 'react-native';
import React from 'react';
import {MsgProvider} from './src/contexts/MsgContext';
import {AuthProvider} from './src/contexts/AuthContext';
import {DataProvider} from './src/contexts/DataContext';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <MsgProvider>
      <AuthProvider>
        <DataProvider>
          <AppNavigator />
        </DataProvider>
      </AuthProvider>
    </MsgProvider>
  );
}

const styles = StyleSheet.create({});
