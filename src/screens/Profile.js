import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../contexts/AuthContext';

export default function Profile() {
  const {user, signOut} = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <Text>{user?.userName}</Text>
        <Text>{user?.email}</Text>
      </View>
      <Button color="red" title="Logout" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
