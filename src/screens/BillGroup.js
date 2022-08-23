import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import GroupDetails from '../components/bills/GroupDetails';
import UsersOfGroup from '../components/bills/UsersOfGroup';

export default function BillGroup() {
  const {params} = useRoute();

  return (
    <View style={styles.container}>
      <GroupDetails bill_id={params.bill_id} />
      <UsersOfGroup bill_id={params.bill_id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
