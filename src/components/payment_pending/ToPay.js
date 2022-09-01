import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useData} from '../../contexts/DataContext';
import {useAuth} from '../../contexts/AuthContext';
import Loading from '../../containers/Loading';
import ListItem from './ListItem';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import LoadingListItems from '../home/LoadingListItems';

export default function ToPay() {
  const {user} = useAuth();
  const {loading, userGroups, fetchData} = useData();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (userGroups) {
      setList(
        userGroups?.filter(
          item => item.status === 'PENDING' && item.user_id === user.user_id,
        ),
      );
    }
  }, [userGroups, user]);

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
        renderItem={({item}) => <ListItem item={item} scene="SEND" />}
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
