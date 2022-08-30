import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../styles';
import {TabBar, TabView} from 'react-native-tab-view';
import ToPay from '../components/payment_pending/ToPay';
import ToReceive from '../components/payment_pending/ToReceive';

export default function PendingPayments() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'send', title: 'Send'},
    {key: 'receive', title: 'Receive'},
  ]);

  const renderScene = ({route}) => {
    console.log(route);
    switch (route.key) {
      case 'send':
        return <ToPay />;
      case 'receive':
        return <ToReceive />;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={scene => (
        <Text
          style={[
            styles.label,
            {
              color: scene.focused ? colors.Primary : colors.Gray,
            },
          ]}>
          {scene.route.title}
        </Text>
      )}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
    />
  );

  return (
    <TabView
      useNativeDriver
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      style={{marginTop: -2, marginHorizontal: 10}}
      sceneContainerStyle={{
        marginHorizontal: 10,
        marginTop: 5,
        paddingRight: 10,
      }}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 15,
  },
  indicator: {
    backgroundColor: colors.Primary,
    height: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
});
