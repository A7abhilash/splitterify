import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '../styles';

const Loading = () => {
  return (
    <ActivityIndicator
      size="large"
      color={colors.Primary}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    />
  );
};

export default Loading;
