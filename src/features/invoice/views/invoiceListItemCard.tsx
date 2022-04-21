import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
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
});

const InvoiceCard = ({invoice}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Invoice ID: '}</Text>
        <Text style={styles.value}>{invoice.invoiceNumber}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Description: '}</Text>
        <Text style={styles.value}>{invoice.description}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Amount: '}</Text>
        <Text style={styles.value}>{`$ ${invoice.totalAmount.toFixed(
          2,
        )}`}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Paid: '}</Text>
        <Text style={styles.value}>{`$ ${invoice.totalPaid.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default InvoiceCard;
