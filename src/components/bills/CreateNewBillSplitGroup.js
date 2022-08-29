import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../styles';
import {useMsg} from '../../contexts/MsgContext';
import {BACKEND_URL} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateNewBillSplitGroup() {
  const {setAlert, setToast} = useMsg();

  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => {
    setInitialData();
    setVisible(false);
  };

  const [name, setName] = useState('');
  const [expense, setExpense] = useState(0);
  const [switchOn, setSwitchOn] = useState(false);

  const navigation = useNavigation();

  const setInitialData = () => {
    setName('');
    setExpense(0);
    setSwitchOn(false);
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const handleCreate = async () => {
    try {
      // console.log({name, expense, switchOn});
      if (name.trim() && expense) {
        Keyboard.dismiss();

        const newGroup = {
          name,
          expense,
          type: switchOn ? 'SPLIT_INDIVIDUALLY' : 'SPLIT_EQUALLY',
        };

        const token = await AsyncStorage.getItem('token');
        const res = await fetch(BACKEND_URL + '/bills/create', {
          method: 'POST',
          body: JSON.stringify(newGroup),
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }),
        });
        const data = await res.json();

        if (data.success) {
          closeModal();
          // TODO: Navigate to newly created group
          navigation.navigate('BillGroup', {bill_id: data.bill_id});
        }
        setToast(data.msg);
      } else {
        setAlert({
          msg: 'Invalid Input',
          text: 'Understood',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.fab}>
        <TouchableOpacity style={styles.btn} onPress={openModal}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} onShow={openModal} onDismiss={closeModal}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>Group Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter group name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.textInputGroup}>
              <Text style={styles.label}>Total Expense</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.textInput}
                placeholder="Enter total expense"
                value={expense}
                onChangeText={setExpense}
              />
            </View>
            <View
              style={{
                ...styles.textInputGroup,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>Split Individually?</Text>
                <Switch
                  value={switchOn}
                  onValueChange={() => setSwitchOn(!switchOn)}
                />
              </View>
              <Text style={styles.label}>
                (*By Default, the bill will be split EQUALLY)
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleCreate}
            style={{
              ...styles.modalBtn,
              backgroundColor: colors.Success,
              borderRadius: 10,
              paddingVertical: 5,
            }}>
            <Text style={{...styles.modalBtnText, color: colors.Light}}>
              Create
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={{...styles.modalBtn}}>
            <Text style={{...styles.modalBtnText, color: colors.Danger}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginBottom: 10,
    marginRight: 5,
    bottom: 0,
    right: 0,
  },
  btn: {
    width: 51,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 22,
    color: colors.Light,
  },
  innerContainer: {flex: 1, padding: 10},
  textInputGroup: {
    marginVertical: 5,
  },
  label: {
    fontFamily: fonts.PoppinsLight,
    fontSize: 10,
  },
  textInput: {
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#121212',
    borderWidth: 0.5,
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
