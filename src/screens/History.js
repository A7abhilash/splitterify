import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../styles';
import {TabBar, TabView} from 'react-native-tab-view';
import SentRecords from '../components/history/SentRecords';
import ReceivedRecords from '../components/history/ReceivedRecords';

export default function History() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'sent_records', title: 'Sent'},
    {key: 'received_records', title: 'Received'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'sent_records':
        return <SentRecords />;
      case 'received_records':
        return <ReceivedRecords />;
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
