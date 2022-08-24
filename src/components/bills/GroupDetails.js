import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListItem from '../home/ListItem';
import {useMsg} from '../../contexts/MsgContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../utils';
import Loading from '../../containers/Loading';

export default function GroupDetails({bill_id}) {
  const {setToast} = useMsg();

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bill_id) {
      const fetchDetails = async () => {
        setLoading(true);

        try {
          const token = await AsyncStorage.getItem('token');
          const res = await fetch(BACKEND_URL + '/bills/' + bill_id, {
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          });
          const data = await res.json();

          if (data.success) {
            // console.log(data.results);
            setItem(data.result);
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
      <ListItem item={item} scene="MY_USER_GROUPS" show_status />
    </View>
  );
}

const styles = StyleSheet.create({});
