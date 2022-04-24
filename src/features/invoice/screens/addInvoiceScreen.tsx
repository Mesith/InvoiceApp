import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InvoiceCreateForm from '../views/invoiceCreateForm';

const AddInvoiceScreen = ({navigation}) => {
  return (
    <View style={style.createInvoiceView}>
      <InvoiceCreateForm navigation={navigation} />
    </View>
  );
};

const style = StyleSheet.create({
  createInvoiceView: {
    paddingLeft: 1,
    paddingRight: 1,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE8E7',
  },
});

export default AddInvoiceScreen;
