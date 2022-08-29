import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../../utils';
import {useMsg} from '../../../contexts/MsgContext';
import {useAuth} from '../../../contexts/AuthContext';
import Member from './Member';
import ListEmptyComponent from '../../../containers/ListEmptyComponent';
import {colors, fonts} from '../../../styles';

export default function SearchMembers({list, setList}) {
  const {setToast} = useMsg();
  const {user} = useAuth();

  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async () => {
    try {
      setLoading(true);
      setSearchResults([]);

      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/auth/user/search?name=' + name, {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();
      //   console.log(data);
      if (data.success) {
        setSearchResults(data.results);
      }
      if (!data.results?.length || !data.success) {
        setToast(data.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addMember = item => {
    if (!list.includes(item) && item.user_id !== user.user_id) {
      setList(prev => [item, ...prev]);
      setName('');
    } else {
      setToast('Member already added');
    }
  };

  const removeMember = item => {
    if (list.includes(item)) {
      setList(prev => prev.filter(_item => _item.user_id !== item.user_id));
    } else {
      setToast('Member already added');
    }
  };

  return (
    <View>
      <FlatList
        data={searchResults.filter(item => item.user_id !== user.user_id)}
        keyExtractor={item => item.user_id}
        renderItem={({item}) => (
          <Member user={item} onPress={() => addMember(item)} icon="+" />
        )}
        ListHeaderComponent={
          <>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Search users"
              style={styles.textInput}
              onSubmitEditing={searchUsers}
            />
            {name && (
              <TouchableOpacity
                onPress={() =>
                  addMember({
                    guestName: name,
                  })
                }>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsMedium,
                    color: colors.Warning,
                    marginBottom: 0,
                    paddingLeft: 5,
                  }}>
                  Add as Guest Member
                </Text>
              </TouchableOpacity>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && <ListEmptyComponent text="No users found." />
        }
        ListFooterComponent={
          loading && <ListEmptyComponent text="Searching..." />
        }
      />

      {list.length !== 0 && (
        <View>
          <ScrollView>
            <Text style={styles.headerText}>Added members</Text>
            <View>
              {list.map((item, index) => (
                <Member
                  key={(item.user_id || 'USER-') + index}
                  user={item}
                  onPress={() => removeMember(item)}
                  icon="x"
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 5,
    borderColor: '#121212',
    borderWidth: 0.5,
    fontFamily: fonts.PoppinsMedium,
  },
  headerText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
  },
});
