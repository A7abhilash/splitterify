import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ListItem from '../home/ListItem';

export default function GroupDetails() {
  return (
    <View>
      <ListItem
        item={{
          name: 'Group Name',
          email: 'n16@test.in',
          created_date: '2022-08-18T00:00:00.000Z',
          created_by: 'SJVZ0NC8J',
          owes_to: 'SJVZ0NC8J',
          owner_email: 'a7@test.in',
          owner_userName: 'Abhilash MH',
          expense: 2500,
        }}
        scene="MY_USER_GROUPS"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
