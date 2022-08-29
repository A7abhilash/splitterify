import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import UsersOfGroup from '../components/bills/UsersOfGroup';
import Loading from '../containers/Loading';
import ListItem from '../components/home/ListItem';
import {useMsg} from '../contexts/MsgContext';
import {BACKEND_URL} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BillGroup() {
  const {params} = useRoute();
  const {setToast} = useMsg();

  const [billGroup, setBillGroup] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params && params.bill_id) {
      const fetchDetails = async () => {
        setLoading(true);

        try {
          const token = await AsyncStorage.getItem('token');
          const res = await fetch(BACKEND_URL + '/bills/' + params.bill_id, {
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          });
          const data = await res.json();

          if (data.success) {
            // console.log(data.results);
            setBillGroup(data.result);
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
  }, [params]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ListItem item={billGroup} scene="MY_USER_GROUPS" show_status />
      )}
      <UsersOfGroup bill_id={params.bill_id} billGroup={billGroup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
