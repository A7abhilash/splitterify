import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMsg} from './MsgContext';
import Loading from '../containers/Loading';
import {BACKEND_URL} from '../utils/';

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({children}) {
  const {setToast} = useMsg();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setGuestMode = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      if (isAuthenticated) {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(BACKEND_URL + '/auth/user', {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
        const data = await res.json();
        // console.log(data.user);
        if (data.success) {
          setUser(data.user);
        } else {
          setGuestMode();
        }
        setToast(data.msg);
      } else {
        await AsyncStorage.removeItem('token');
        setGuestMode();
      }
    } catch (error) {
      console.log(error);
      setGuestMode();
    } finally {
      setLoading(false);
    }
  };

  const signIn = (email, password) => {
    // console.log("Signed in");
    // console.log(email, password);

    fetch(BACKEND_URL + '/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.error) {
          console.log(data.error);
        }
        if (data.success) {
          // console.log(data);
          try {
            await AsyncStorage.setItem('token', data.token);
            setToast(data.msg);
            setIsAuthenticated(true);
          } catch (error) {
            console.log(error);
            setToast(error);
          }
        } else {
          setToast(data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        setToast('123Server Error, Please try later...');
      });
  };

  const signUp = (userName, email, password, phoneNo) => {
    fetch(BACKEND_URL + '/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({userName, email, password, phoneNo}),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.error) {
          console.log(data.error);
        }
        if (data.success) {
          // console.log(data);
          setToast(data.msg);
          // navigation.replace('Home');
        }
      })
      .catch(err => {
        console.log(err);
        setToast('Server Error, Please try later...');
      });
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('token');
      setGuestMode();
    } catch (error) {
      //   console.log(error);
      setToast('Something went wrong, Please login again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      AsyncStorage.getItem('token').then(data => {
        // console.log(data);
        setIsAuthenticated(data ? true : false);
        if (!data) {
          setLoading(false);
        }
      });
    } catch (error) {
      //   console.log(error);
      setToast('Something went wrong, Please login again!');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    } else {
      setGuestMode();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setIsAuthenticated,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
      }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
