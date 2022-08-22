import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useData} from '../../contexts/DataContext';
import Loading from '../../containers/Loading';
import ListItem from './ListItem';

export default function PendingBillPayment() {
  const {loading, userGroups} = useData();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (userGroups) {
      setList(userGroups?.filter(item => item.status === 'PENDING'));
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
        renderItem={({item}) => <ListItem item={item} is_scene_1 />}
      />
    </View>
  );
}
