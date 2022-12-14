import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useData} from '../../contexts/DataContext';
import ListItem from './ListItem';
import CreateNewBillSplitGroup from '../bills/CreateNewBillSplitGroup';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import {fonts} from '../../styles';
import LoadingListItems from './LoadingListItems';

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
    return (
      <>
        <Text style={styles.headerText}>My Groups</Text>
        <LoadingListItems nums={[1, 2, 3]} />
      </>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={list}
        keyExtractor={(item, index) =>
          item.bill_id + item.user_id + item.owes_to + item.guestName + index
        }
        renderItem={({item}) => <ListItem item={item} scene="MY_USER_GROUPS" />}
        ListHeaderComponent={<Text style={styles.headerText}>My Groups</Text>}
        ListEmptyComponent={<ListEmptyComponent text="No groups found..." />}
        refreshing={loading}
        onRefresh={fetchData}
        refreshControl={null}
      />
      <CreateNewBillSplitGroup />
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
});
