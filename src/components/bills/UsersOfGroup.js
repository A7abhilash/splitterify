import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BACKEND_URL} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMsg} from '../../contexts/MsgContext';
import Loading from '../../containers/Loading';
import UserGroupItem from './UserGroupItem';
import ListEmptyComponent from '../../containers/ListEmptyComponent';
import {fonts} from '../../styles';

export default function UsersOfGroup({bill_id}) {
  const {setToast} = useMsg();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (bill_id) {
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
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [bill_id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text style={styles.headerText}>Group Members</Text>
      <FlatList
        data={list}
        keyExtractor={item => item.bill_id + item.user_id}
        renderItem={({item}) => <UserGroupItem item={item} />}
        ListEmptyComponent={<ListEmptyComponent text="No members added..." />}
      />
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
