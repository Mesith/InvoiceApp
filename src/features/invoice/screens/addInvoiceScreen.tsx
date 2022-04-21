import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import InvoiceCreateForm from '../views/invoiceCreateForm';

const AddInvoiceScreen = () => {
  return (
    <View style={style.createInvoiceView}>
      <InvoiceCreateForm />
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
