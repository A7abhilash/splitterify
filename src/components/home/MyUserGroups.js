import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useData} from '../../contexts/DataContext';
import Loading from '../../containers/Loading';
import ListItem from './ListItem';
import CreateNewBillSplitGroup from '../bills/CreateNewBillSplitGroup';
import ListEmptyComponent from '../../containers/ListEmptyComponent';

export default function MyUserGroups() {
  const {loading, userGroups, billsGroupCreated, fetchData} = useData();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (userGroups && billsGroupCreated) {
      const items = [...billsGroupCreated, ...userGroups];
      setList(
        items?.sort(
          (A, B) =>
            new Date(B.created_date).getTime() -
            new Date(A.created_date).getTime(),
        ),
      );
    }
  }, [userGroups, billsGroupCreated]);

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
        renderItem={({item}) => <ListItem item={item} scene="MY_USER_GROUPS" />}
        ListEmptyComponent={<ListEmptyComponent text="No groups found..." />}
        refreshing={loading}
        onRefresh={fetchData}
        refreshControl={null}
      />
      <CreateNewBillSplitGroup />
    </View>
  );
}
