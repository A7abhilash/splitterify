import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../styles';

export default function LoadingUserGroupItem({nums = [1, 2, 3]}) {
  return (
    <View>
      <ScrollView>
        {nums.map((_, index) => (
          <View
            style={styles.itemContainer}
            key={'SkeletonPlaceholder-' + index}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <SkeletonPlaceholder.Item
                      width={20}
                      height={20}
                      borderRadius={20}
                    />
                    <SkeletonPlaceholder.Item
                      width={80}
                      height={20}
                      borderRadius={5}
                      marginLeft={12}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={50}
                  height={20}
                  borderRadius={5}
                  marginTop={5}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width="30%"
                height={10}
                borderRadius={5}
                marginTop={5}
              />
            </SkeletonPlaceholder>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.Light,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
