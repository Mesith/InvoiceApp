import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import {useFetchInvoicesQuery} from '../invoiceApiSlice';
import InvoiceCard from '../views/invoiceListItemCard';
import {setInvoiceListEnd} from '../invoiceSlice';
import {useAppSelector} from '../../../app/hooks';

const InvoicesScreen = () => {
  const isListEnd = useAppSelector(state => state.invoice.isListEnd);
  const [page, setPage] = useState<number>(1);
  const {data = [], isFetching} = useFetchInvoicesQuery(page);

  const fetchMoreData = () => {
    if (!isListEnd && !isFetching) {
      setInvoiceListEnd(true);
      setPage(page + 1);
    }
  };

  const renderHeader = () => <Text style={style.title}>Invoices</Text>;

  const renderFooter = () => (
    <View style={style.footerText}>
      {isFetching && <ActivityIndicator />}
      {!isFetching && <Text>No more invoices at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={style.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => {}} title="Refresh" />
    </View>
  );

  return (
    <SafeAreaView style={style.container}>
      {isFetching ? (
        <View style={style.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={style.contentStyle}
          data={data.data}
          renderItem={({item}) => <InvoiceCard invoice={item} />}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      )}
    </SafeAreaView>
  );
};

const style: any = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {flexGrow: 1},
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InvoicesScreen;
