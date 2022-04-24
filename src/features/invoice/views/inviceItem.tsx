import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {Field, Form} from 'react-final-form';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextField} from './invoiceCreateForm';

export interface InvoiceItem {
  name: string;
  description: string;
  quantity: string;
  rate: string;
  mou: string;
}

const AddInvoiceModal = (props: {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  onAddItem: (item: InvoiceItem) => void;
}) => {
  const onSubmit = (values: any) => {
    props.onAddItem({
      ...values,
      rate: parseFloat(values.rate),
      quantity: parseFloat(values.quantity),
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderContent}>
              <Text style={styles.modalHeaderTextContent}>
                Add Invoice Item
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
              }}>
              <Text style={styles.modalHeaderCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <Form
            onSubmit={onSubmit}
            //validate={validate}
            initialValues={{
              itemReference: '',
              description: 'Honda RC150',
              quantity: 0,
              rate: 0,
              itemName: 'Honda Motor',
              itemUOM: 'KG',
              customFields: [
                {
                  key: 'taxiationAndDiscounts_Name',
                  value: 'VAT',
                },
              ],
              extensions: [
                {
                  addDeduct: 'ADD',
                  value: 10,
                  type: 'FIXED_VALUE',
                  name: 'tax',
                },
                {
                  addDeduct: 'DEDUCT',
                  value: 10,
                  type: 'PERCENTAGE',
                  name: 'tax',
                },
              ],
            }}
            render={({handleSubmit, values}) => (
              <View style={styles.formContainer}>
                <Field name="itemName">
                  {({input, meta}) => (
                    <TextField
                      value={values.itemName}
                      onChange={input.onChange}
                      placeholder="Name"
                      isError={meta.error}
                      error={''}
                    />
                  )}
                </Field>

                <Field name="quantity">
                  {({input, meta}) => (
                    <TextField
                      value={values.quantity}
                      onChange={input.onChange}
                      placeholder="Quantity"
                      isError={meta.error}
                      error={''}
                    />
                  )}
                </Field>

                <Field name="rate">
                  {({input, meta}) => (
                    <TextField
                      value={values.rate}
                      onChange={input.onChange}
                      placeholder="Rate"
                      keyboardType="number-pad"
                      isError={meta.error}
                      error={''}
                    />
                  )}
                </Field>
                <Text>MOU</Text>
                <Field name="itemUOM">
                  {({input}) => (
                    <Picker
                      selectedValue={values.currency}
                      onValueChange={(itemValue, itemIndex) =>
                        input.onChange(itemValue)
                      }>
                      <Picker.Item label="KG" value="KG" />
                      <Picker.Item label="M" value="M" />
                      <Picker.Item label="L" value="L" />
                      <Picker.Item label="M2" value="M2" />
                    </Picker>
                  )}
                </Field>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleSubmit();
                    props.setModalVisible(!props.modalVisible);
                  }}>
                  <Text style={styles.buttontext}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttontext: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    width: '100%',
  },
  button: {
    backgroundColor: '#228FDF',
    width: '80%',
    height: 45,
    padding: 10,
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    width: Dimensions.get('window').width * 0.8,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'column',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
    fontWeight: 'bold',
    width: 90,
  },
  value: {
    flexWrap: 'wrap',
    marginHorizontal: 0,
    display: 'flex',
    flex: 0,
    width: '100%',
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderTextContent: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  modalHeaderCloseText: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default AddInvoiceModal;
