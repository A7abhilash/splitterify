import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useData} from '../../contexts/DataContext';
import Loading from '../../containers/Loading';
import ListItem from '../home/ListItem';
import ListEmptyComponent from '../../containers/ListEmptyComponent';

export default function SentRecords() {
  const {loading, userGroups, fetchData} = useData();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (userGroups) {
      setList(userGroups?.filter(item => item.status === 'PAID'));
    }
  }, [userGroups]);

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
        renderItem={({item}) => <ListItem item={item} scene="SENT_HISTORY" />}
        ListEmptyComponent={<ListEmptyComponent text="No records found..." />}
        refreshing={loading}
        onRefresh={fetchData}
        refreshControl={null}
      />
    </View>
  );
}
