import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../styles';
import AvatarName from '../../containers/AvatarName';
import {useAuth} from '../../contexts/AuthContext';

export default function UserGroupItem({item}) {
  const {user} = useAuth();
  {
    /* 
       {
        "bill_id": "O5jAvdjWv", "created_by": "SJVZ0NC8J", 
        "created_date": "2022-08-18T00:00:00.000Z", 
        "email": "n16@test.in", "expense": 700, 
        "name": "Test-1", "owes_to": "SJVZ0NC8J", 
        "owner_email": "a7@test.in", "owner_phoneNo": 1234567980, 
        "owner_userName": "A7", "owner_user_id": "SJVZ0NC8J", 
        "paid_date": null, "phoneNo": 1234567980, 
        "status": "PENDING", "userName": "N16", "user_id": "-VT-MtBRI"},
      */
  }

  return (
    <View style={styles.container}>
      <View style={{...styles.row}}>
        <AvatarName
          text={item.email || item.userName + item.user_id}
          userName={item.userName}
          email={item.email}
          phoneNo={item.phoneNo}
        />
        <Text
          style={{
            ...styles.expense,
            color: item.status === 'PENDING' ? colors.Danger : colors.Success,
          }}>
          ₹ {item.expense}
        </Text>
      </View>
      <View style={{...styles.row}}>
        <View>
          {item.status !== 'PENDING' && (
            <Text style={styles.paid_date}>
              Paid on: {new Date(item.paid_date).toDateString()}
            </Text>
          )}
        </View>
        <View>
          {item.status === 'PENDING' &&
            (item.created_by === user?.user_id ||
              item.user_id === user?.user_id) && (
              <TouchableOpacity style={styles.btn}>
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
    fontSize: 11,
    fontStyle: 'italic',
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
