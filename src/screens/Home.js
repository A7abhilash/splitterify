import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {fonts} from '../styles';
import RenderHomeTabs from '../components/home/RenderHomeTabs';

export default function Home() {
  const {user} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Welcome {user?.userName}</Text>
        <Text style={styles.headerCaption}>
          Split the bill among friends going on vacation/outing.
        </Text>
      </View>
      <RenderHomeTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    borderRadius: 20,
    backgroundColor: 'lightblue',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 23,
    fontFamily: fonts.PoppinsSemiBold,
  },
  headerCaption: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: fonts.PoppinsLight,
  },
});
