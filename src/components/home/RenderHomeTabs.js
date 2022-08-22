import React, {useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {colors, fonts} from '../../styles';
import PendingBillPayment from './PendingBillPayment';
import MyUserGroups from './MyUserGroups';

export default function RenderHomeTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'my_user_groups', title: 'My User Groups'},
    {key: 'pending_payments', title: 'Pending Payments'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'pending_payments':
        return <PendingBillPayment />;
      case 'my_user_groups':
        return <MyUserGroups />;
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
      style={{marginTop: 10}}
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
