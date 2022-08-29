import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts} from '../../styles';
import AvatarName from '../../containers/AvatarName';
import {useAuth} from '../../contexts/AuthContext';
import {BACKEND_URL} from '../../utils';
import {useMsg} from '../../contexts/MsgContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserGroupItem({item, bill_id}) {
  const {setToast} = useMsg();
  const {user} = useAuth();

  const [isPaid, setIsPaid] = useState(false);
  const [paidDate, setPaidDate] = useState(null);

  useEffect(() => {
    if (item) {
      setIsPaid(item.status === 'PAID' && item.paid_date !== null);
      setPaidDate(item.paid_date);
    }
  }, [item]);

  const updatePayment = async () => {
    try {
      setIsPaid(true);
      setPaidDate(new Date());

      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        BACKEND_URL + '/user_groups/update/' + item.txn_id,
        {
          method: 'PATCH',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }),
        },
      );
      const data = await res.json();
      if (!data.success) {
        setIsPaid(false);
        setPaidDate(null);
      }
      setToast(data.msg);
    } catch (error) {
      console.log(error);
      setToast('Failed to mark as PAID!');
      setIsPaid(false);
      setPaidDate(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.row}}>
        <AvatarName
          text={item.email}
          userName={item.userName || item.guestName}
          email={item.email}
          phoneNo={item.phoneNo}
          isGuest={!item.user_id}
        />
        <Text
          style={{
            ...styles.expense,
            color: isPaid ? colors.Success : colors.Danger,
          }}>
          ₹ {item.amount_to_pay}
        </Text>
      </View>
      <View style={{...styles.row}}>
        <View>
          {isPaid && (
            <Text style={styles.paid_date}>
              Paid on: {new Date(paidDate).toDateString()}
            </Text>
          )}
        </View>
        <View>
          {!isPaid &&
            (item.created_by === user?.user_id ||
              item.user_id === user?.user_id) && (
              <TouchableOpacity style={styles.btn} onPress={updatePayment}>
                <Text style={styles.btnText}>Mark as PAID</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.Light,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expense: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
  },
  paid_date: {
    fontSize: 10,
    fontFamily: fonts.PoppinsItalic,
    color: 'rgba(0,0,0,0.6)',
  },
  btn: {
    backgroundColor: colors.Warning,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  btnText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 12,
  },
});
