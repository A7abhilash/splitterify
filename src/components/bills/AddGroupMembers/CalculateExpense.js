import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Member from './Member';
import {fonts} from '../../../styles';

export default function CalculateExpense({expenseList, list}) {
  return (
    <View>
      <ScrollView>
        <Text style={styles.headerText}>Bill Split</Text>
        <View>
          {expenseList.map((item, index) => (
            <Member
              key={(item.user_id || 'USER-') + index}
              user={list[index]}
              expense={item.expense}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
  },
});
