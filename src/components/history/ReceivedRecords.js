import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../../containers/Loading';
import ListItem from '../home/ListItem';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../utils';
import {useMsg} from '../../contexts/MsgContext';

export default function ReceivedRecords() {
  const {setToast} = useMsg();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/user_groups/received_history', {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        setList(
          data.results.sort(
            (A, B) =>
              new Date(A.created_date).getTime() -
              new Date(B.created_date).getTime(),
          ),
        );
      } else {
        setToast(data.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
