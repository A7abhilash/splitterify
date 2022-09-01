import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useData} from '../../contexts/DataContext';
import {useAuth} from '../../contexts/AuthContext';
import Loading from '../../containers/Loading';
import ListItem from './ListItem';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import LoadingListItems from '../home/LoadingListItems';

export default function ToReceive() {
  const {user} = useAuth();
  const {loading, receivedRecords, fetchData} = useData();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (receivedRecords) {
      setList(
        receivedRecords?.filter(
          item => item.status === 'PENDING' && item.owes_to === user.user_id,
        ),
      );
    }
  }, [receivedRecords, user]);

  if (loading) {
    return <LoadingListItems nums={[1, 2, 3]} />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={list}
        keyExtractor={(item, index) =>
          item.bill_id + item.user_id + item.owes_to + item.guestName + index
        }
        renderItem={({item}) => <ListItem item={item} scene="RECEIVE" />}
        ListEmptyComponent={
          <ListEmptyComponent text="No pending payments..." />
        }
        refreshing={loading}
        onRefresh={fetchData}
        refreshControl={null}
      />
    </View>
  );
}
