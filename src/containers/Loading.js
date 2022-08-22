import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <ActivityIndicator
      size="large"
      color="blue"
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  );
};

export default Loading;
