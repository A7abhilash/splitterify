import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../styles';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AvatarName from '../../containers/AvatarName';

export default function ListItem({item, scene}) {
  const {user} = useAuth();

  const navigation = useNavigation();

  const label1 = {
    PENDING_PAYMENTS: 'Owes To',
    MY_USER_GROUPS: 'Created By',
    RECEIVED_HISTORY: 'Received By',
    SENT_HISTORY: 'Sent To',
  };

  const label2 = {
    PENDING_PAYMENTS: 'Pay',
    MY_USER_GROUPS: 'Total Expense',
    RECEIVED_HISTORY: 'Received Amount',
    SENT_HISTORY: 'Sent Amount',
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BillGroup', {bill_id: item.bill_id})}>
      <View>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>{label1[scene]}</Text>
            <AvatarName
              text={
                item.owner_email ||
                item.owner_userName + item.owner_user_id ||
                item.email ||
                item.userName + item.user_id
              }
              userName={item?.owner_userName || item?.userName}
              email={item?.owner_email || item?.email}
              phoneNo={item?.owner_phoneNo}
            />
          </View>
          <View>
            <Text style={styles.label}>{label2[scene]}</Text>
            <Text style={styles.value}>₹ {item?.expense}</Text>
          </View>
        </View>
        <Text style={styles.created_date}>
          Group created on: {new Date(item.created_date).toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.Silver,
  },
  name: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 19,
    color: colors.Dark,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.PoppinsLight,
    fontSize: 10,
  },
  value: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
  },
  created_date: {
    fontSize: 11,
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.6)',
  },
});
