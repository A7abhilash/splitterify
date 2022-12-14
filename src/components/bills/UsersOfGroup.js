import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BACKEND_URL} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMsg} from '../../contexts/MsgContext';
import Loading from '../../containers/Loading';
import UserGroupItem from './UserGroupItem';
import {fonts} from '../../styles';
import AddGroupMembers from './AddGroupMembers';
import {useAuth} from '../../contexts/AuthContext';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import LoadingUserGroupItem from './LoadingUserGroupItem';

export default function UsersOfGroup({bill_id, billGroup}) {
  const {user} = useAuth();
  const {setToast} = useMsg();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const fetchDetails = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/user_groups/' + bill_id, {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();

      if (data.success) {
        // console.log(data.results);
        setList(data.results);
      } else {
        setToast(data.msg);
      }
    } catch (error) {
      // console.log(error);
      setToast('Something went wrong. Please try again later!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bill_id) {
      fetchDetails();
    }
  }, [bill_id]);

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
      <Text style={styles.headerText}>Group Members ({list?.length})</Text>
      {list?.length !== 0 ? (
        <FlatList
          data={list}
          keyExtractor={item => item.txn_id}
          renderItem={({item}) => (
            <UserGroupItem item={item} billGroupName={billGroup.name} />
          )}
          refreshing={loading}
          onRefresh={fetchDetails}
          refreshControl={null}
        />
      ) : billGroup?.created_by === user.user_id ? (
        <AddGroupMembers billGroup={billGroup} fetchDetails={fetchDetails} />
      ) : (
        <ListEmptyComponent text="No members added." />
      )}
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
