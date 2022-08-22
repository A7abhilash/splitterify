import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../styles';
import {useAuth} from '../../contexts/AuthContext';
import IdenticonAvatar from '../../containers/IdenticonAvatar';

// scene-1: PENDING PAYMENTS
// scene-2: MY USER GROUPS

export default function ListItem({item, is_scene_1 = false}) {
  const {user} = useAuth();

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View>
        <Text style={styles.name}>{item?.name}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>
              {is_scene_1 ? 'Owes To' : 'Created By'}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{paddingBottom: 5}}>
                <IdenticonAvatar
                  text={
                    item.owner_email || item.owner_userName + item.owner_user_id
                  }
                />
              </View>
              <Text style={styles.value}>
                {is_scene_1 || item?.created_by !== user?.user_id
                  ? item?.owner_userName
                  : 'You'}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>
              {is_scene_1 ? 'Pay' : 'Total Expense'}
            </Text>
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
