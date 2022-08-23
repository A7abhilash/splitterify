import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import IdenticonAvatar from './IdenticonAvatar';
import ProfileDetails from './ProfileDetails';
import {colors, fonts} from '../styles';

export default function AvatarName({text, userName, email, phoneNo}) {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={openModal}>
        <View style={{paddingBottom: 5}}>
          <IdenticonAvatar text={text} />
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        onShow={openModal}
        onDismiss={closeModal}
        animationType="fade"
        transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: colors.Light,
              padding: 10,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <View>
              <ProfileDetails
                user={{
                  userName,
                  email,
                  phoneNo,
                }}
              />
              <TouchableOpacity
                onPress={closeModal}
                style={{...styles.modalBtn}}>
                <Text style={{...styles.modalBtnText, color: colors.Danger}}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  userName: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  modalBtnText: {
    fontFamily: fonts.PoppinsMedium,
  },
});
