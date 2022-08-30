import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../../containers/Loading';
import ListItem from '../home/ListItem';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../utils';
import {useMsg} from '../../contexts/MsgContext';
import {useData} from '../../contexts/DataContext';

export default function ReceivedRecords() {
  const {setToast} = useMsg();
  const {receivedRecords, fetchData, loading} = useData();

  const [list, setList] = useState([]);

  useEffect(() => {
    if (receivedRecords) {
      setList(
        receivedRecords
          ?.sort(
            (A, B) =>
              new Date(A.created_date).getTime() -
              new Date(B.created_date).getTime(),
          )
          .filter(item => item.status === 'PAID'),
      );
    }
  }, [receivedRecords]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={list}
        keyExtractor={(item, index) =>
          item.bill_id + item.user_id + item.owes_to + item.guestName + index
        }
        renderItem={({item}) => (
          <ListItem item={item} scene="RECEIVED_HISTORY" />
        )}
        ListEmptyComponent={<ListEmptyComponent text="No records found..." />}
        refreshing={loading}
        onRefresh={fetchData}
        refreshControl={null}
      />
    </View>
  );
}
