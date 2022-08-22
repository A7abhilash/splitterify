import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMsg} from './MsgContext';
import {BACKEND_URL} from '../utils/';
import {useAuth} from './AuthContext';

export const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export function DataProvider({children}) {
  const {isAuthenticated} = useAuth();
  const {setToast} = useMsg();

  const [loading, setLoading] = useState([]);

  const [userGroups, setUserGroups] = useState([]);
  const [billsGroupCreated, setBillsGroupCreated] = useState([]);

  const fetchUserGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/user_groups/groups_of_user', {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        setUserGroups(
          data.results.sort(
            (A, B) =>
              new Date(A.created_date).getTime() -
              new Date(B.created_date).getTime(),
          ),
        );
      } else {
        setToast(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserBills = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BACKEND_URL + '/bills', {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success) {
        setBillsGroupCreated(
          data.results.sort(
            (A, B) =>
              new Date(A.created_date).getTime() -
              new Date(B.created_date).getTime(),
          ),
        );
      } else {
        setToast(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setLoading(true);
        await fetchUserBills();
        await fetchUserGroups();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <DataContext.Provider value={{loading, userGroups, billsGroupCreated}}>
      {children}
    </DataContext.Provider>
  );
}
