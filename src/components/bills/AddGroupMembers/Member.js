import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../styles';
import AvatarName from '../../../containers/AvatarName';

export default function Member({user, onPress, icon, expense = null}) {
  return (
    <View style={styles.row}>
      <View>
        <AvatarName
          userName={user.user_id ? user.userName : user.guestName}
          isGuest={!user.user_id}
          email={user.email}
          vpa={user.vpa}
          phoneNo={user.phoneNo}
          text={user.email}
        />
      </View>
      <View>
        {expense === null ? (
          <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: 20, fontFamily: fonts.PoppinsSemiBold}}>
              {icon}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{fontSize: 16, fontFamily: fonts.PoppinsMedium}}>
            ₹ {expense}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: colors.Light,
    borderRadius: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
});
