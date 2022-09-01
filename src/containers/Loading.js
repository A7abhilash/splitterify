import React, {useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import icons from '../../assets/icons';

const Loading = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.Image
        source={icons.logo}
        style={{
          width: 150,
          height: 150,
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </Animated.View>
  );
};

export default Loading;
