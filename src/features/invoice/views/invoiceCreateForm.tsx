import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {Field, Form} from 'react-final-form';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../app/hooks';
import initialData from '../../../app/invoicIntialData.json';
import {useCreateInvoiceMutation} from '../invoiceApiSlice';
import {setInvoiceCreated} from '../invoiceSlice';
import AddInvoiceModal, {InvoiceItem} from './inviceItem';

export const TextField = (props: {
  placeholder: string;
  value: string;
  onChange: (evt: any) => void;
  error: string;
  isError: boolean;
  keyboardType?: string;
  multiline?: boolean;
}) => {
  return (
    <>
      <TextInput
        value={props?.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        style={styles.input}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        multiline={props.multiline ? props.multiline : false}
      />
      {props?.isError ? (
        <Text style={styles.feildError}>{props.error}</Text>
      ) : null}
    </>
  );
};

const InvoiceCreateForm = (props: {navigation}) => {
  const state: any = useSelector(state => state);
  const dispatch = useAppDispatch();
  const [createInvoice, {isLoading, error}] = useCreateInvoiceMutation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onSubmit = (values: any) => {
    createInvoice(values);
  };

  useEffect(() => {
    if (state.invoice.invoiceCreated) {
      props.navigation.navigate('Invoices');
      dispatch(setInvoiceCreated(false));
    }
  }, [state.invoice.invoiceCreated]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!isLoading && (
          <Form
            onSubmit={onSubmit}
            initialValues={initialData.listOfInvoices[0]}
            validate={values => {
              const errors: any = {
                customer: {firstName: '', contact: {email: ''}},
              };
              if (!values.customer.firstName) {
                errors.customer.firstName = 'Required!';
              }
              if (!values.customer.lastName) {
                errors.customer.lastName = 'Required!';
              }
              if (!values.customer.contact.mobileNumber) {
                errors.customer.contact.mobileNumber = 'Required!';
              }
              if (!values.customer.contact.email) {
                errors.customer.contact.email = 'Required!';
              }
              let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
              if (reg.test(values.customer.contact.email) === false) {
                errors.customer.contact.email = 'Email is Not Correct!';
              }
              return errors;
            }}
            render={({handleSubmit, values, errors}) => (
              <View style={styles.container}>
                {error && (
                  <Text style={styles.error}>Something Went wrong !!</Text>
                )}
                <View style={styles.card}>
                  <Text style={styles.subHeader}>Customer</Text>
                  <Field name="customer.firstName">
                    {({input, meta}) => (
                      <TextField
                        value={values.customer.firstName}
                        onChange={input.onChange}
                        placeholder="First Name"
                        isError={meta.error && meta.touched}
                        error={errors.customer.firstName}
                      />
                    )}
                  </Field>
                  <Field name="customer.lastName">
                    {({input, meta}) => (
                      <TextField
                        value={values.customer.lastName}
                        onChange={input.onChange}
                        placeholder="Last Name"
                        isError={meta.error && meta.touched}
                        error={errors.customer.lastName}
                      />
                    )}
                  </Field>

                  <Field name="customer.contact.email">
                    {({input, meta}) => (
                      <TextField
                        value={values.customer.contact.email}
                        onChange={input.onChange}
                        placeholder="Email"
                        keyboardType={'email-address'}
                        isError={meta.error && meta.touched}
                        error={errors.customer.contact.email}
                      />
                    )}
                  </Field>

                  <Field name="customer.contact.mobileNumber">
                    {({input, meta}) => (
                      <TextField
                        value={values.customer.contact.mobileNumber}
                        onChange={input.onChange}
                        placeholder="Mobile No"
                        keyboardType={'phone-pad'}
                        isError={meta.error && meta.touched}
                        error={errors.customer.contact.mobileNumber}
                      />
                    )}
                  </Field>
                </View>

                <View style={styles.card}>
                  <Text style={styles.subHeader}>Details</Text>

                  <Text>Currency</Text>
                  <Field name="currency">
                    {({input}) => (
                      <Picker
                        selectedValue={values.currency}
                        onValueChange={(itemValue, itemIndex) =>
                          input.onChange(itemValue)
                        }>
                        <Picker.Item label="LKR" value="LKR" />
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="SGD" value="SGD" />
                      </Picker>
                    )}
                  </Field>

                  <Text>Invoice Date</Text>
                  <Field name="invoiceDate">
                    {({input}) => (
                      <RNDateTimePicker
                        value={
                          values.invoiceDate
                            ? new Date(values.invoiceDate)
                            : new Date()
                        }
                        style={styles.picker}
                        onChange={(event: any, date: any) => {
                          var local = new Date(date);
                          local.setMinutes(
                            date.getMinutes() - date.getTimezoneOffset(),
                          );

                          input.onChange(local.toJSON().slice(0, 10));
                        }}
                      />
                    )}
                  </Field>

                  <Text>Due Date</Text>
                  <Field name="dueDate">
                    {({input}) => (
                      <RNDateTimePicker
                        value={
                          values.dueDate ? new Date(values.dueDate) : new Date()
                        }
                        style={styles.picker}
                        onChange={(event: any, date: any) => {
                          var local = new Date(date);
                          local.setMinutes(
                            date.getMinutes() - date.getTimezoneOffset(),
                          );

                          input.onChange(local.toJSON().slice(0, 10));
                        }}
                      />
                    )}
                  </Field>

                  <Field name="description">
                    {({input}) => (
                      <TextField
                        value={values.description}
                        onChange={input.onChange}
                        placeholder="Description"
                        multiline={true}
                        isError={false}
                        error={''}
                      />
                    )}
                  </Field>
                </View>

                <View style={styles.card}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.subHeader}>Items</Text>
                    <Button
                      title="Add Item"
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    />
                  </View>

                  <Field name="items">
                    {({input}) => (
                      <View>
                        <FlatList
                          contentContainerStyle={styles.itemListStyle}
                          data={Array.isArray(values.items) ? values.items : []}
                          renderItem={({item}) => (
                            <View style={styles.titleContainer}>
                              <Text style={styles.itemStyle}>
                                {item.itemName}
                              </Text>
                              <Text style={styles.itemStyle}>
                                {item.quantity}
                              </Text>
                              <Text
                                style={
                                  styles.itemStyle
                                }>{`$ ${item?.rate}`}</Text>
                            </View>
                          )}
                        />

                        <AddInvoiceModal
                          setModalVisible={setModalVisible}
                          modalVisible={modalVisible}
                          onAddItem={(item: InvoiceItem) => {
                            const items: InvoiceItem[] = [];
                            const currentList: InvoiceItem[] = Array.isArray(
                              values.items,
                            )
                              ? values.items
                              : [];
                            items.push(item);
                            currentList.forEach((invoiceItem: InvoiceItem) => {
                              items.push(invoiceItem);
                            });
                            input.onChange(items);
                          }}
                        />
                      </View>
                    )}
                  </Field>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text style={styles.buttontext}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.9,
    display: 'flex',
  },
  feildError: {color: 'red', fontSize: 10, marginLeft: 20},
  picker: {flex: 1},
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
  itemStyle: {
    padding: 10,
  },
  itemListStyle: {flexGrow: 1},
  buttontext: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  scrollView: {
    marginHorizontal: 1,
  },
  safeAreaView: {
    marginHorizontal: 0,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  subHeader: {
    fontWeight: 'bold',
  },
  error: {
    fontWeight: 'bold',
    color: 'red',
  },
  container: {
    flex: 1,
    display: 'flex',
  },
  input: {
    margin: 15,
    height: 40,
    paddingLeft: 5,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
});

export default InvoiceCreateForm;
