import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../styles';

export default function LoadingListItems({nums = [1]}) {
  return (
    <View>
      <ScrollView>
        {nums.map((_, index) => (
          <View
            style={styles.itemContainer}
            key={'SkeletonPlaceholder-' + index}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width="50%"
                height={23}
                borderRadius={5}
              />
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginVertical={12}>
                <SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    width={40}
                    height={8}
                    borderRadius={5}
                  />
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={5}>
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
                <SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    width={40}
                    height={8}
                    borderRadius={5}
                  />
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={20}
                    borderRadius={5}
                    marginTop={5}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={50}
                height={10}
                borderRadius={5}
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
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.Silver,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
