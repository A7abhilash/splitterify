import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListEmptyComponent from '../../../containers/ListEmptyComponent';
import {colors, fonts} from '../../../styles';
import {BACKEND_URL} from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchMembers from './SearchMembers';
import {useMsg} from '../../../contexts/MsgContext';
import CalculateExpense from './CalculateExpense';
import Loading from '../../../containers/Loading';
import LoadingUserGroupItem from '../LoadingUserGroupItem';

export default function AddGroupMembers({billGroup, fetchDetails}) {
  const {setToast} = useMsg();

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const [index, setIndex] = useState(0);

  const handleConfirmCreateGroupMembers = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/user_groups/create', {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({groups: expenseList}),
      });
      const data = await res.json();

      if (data.success) {
        fetchDetails();
      }
      setToast(data.msg);
    } catch (error) {
      // console.log(error);
      setToast('Failed to add group members. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const calculateExpense = () => {
    setIndex(1);
    const _items = [];
    const totalExpense = billGroup?.total_expense;
    list.forEach(item => {
      _items.push({
        bill_id: billGroup.bill_id,
        user_id: item.user_id,
        guestName: item.guestName,
        owes_to: billGroup.created_by,
        expense: Math.trunc(totalExpense / (list.length + 1)),
      });
    });
    setExpenseList(_items);
  };

  useEffect(() => {
    setExpenseList([]);
  }, [list]);

  if (loading) {
    return (
      <>
        <Text style={styles.headerText}>Group Members</Text>
        <LoadingUserGroupItem />
      </>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ListEmptyComponent text="NOTE: You can add groups members only once. Later you can't edit or delete the group members once added!" />
        {index === 0 ? (
          <SearchMembers list={list} setList={setList} />
        ) : (
          <CalculateExpense expenseList={expenseList} list={list} />
        )}
      </View>
      <View style={styles.bottomBar}>
        {index === 0 ? (
          <TouchableOpacity
            onPress={calculateExpense}
            disabled={!list.length}
            style={{...styles.btn, backgroundColor: colors.Primary}}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setIndex(0)}
              style={{...styles.btn, backgroundColor: colors.Primary}}>
              <Text style={styles.btnText}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmCreateGroupMembers}
              style={{...styles.btn, backgroundColor: colors.Success}}>
              <Text style={styles.btnText}>Confirm Group</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
  },
  bottomBar: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  btn: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.Light,
    marginBottom: 0,
  },
});
