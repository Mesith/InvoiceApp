import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/app/appNavigator';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  useLoginMutation,
} from './src/features/invoice/invoiceApiSlice';

const Separator = () => <View style={styles.separator} />;

const App = () => {
  const [login, {isLoading}] = useLoginMutation();

  const handleOnSelectChange = (event: any) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'password');
    urlencoded.append('scope', 'openid');
    urlencoded.append('client_id', CLIENT_ID);
    urlencoded.append('client_secret', CLIENT_SECRET);
    urlencoded.append(
      'username',
      encodeURIComponent('dung+octopus4@101digital.io'),
    );
    urlencoded.append('password', 'Abc@123456');
    login(urlencoded.toString());
  };

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
