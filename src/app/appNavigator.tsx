import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from '../features/splash/splashScreen';
import SignInScreen from '../features/auth/signInScreen';
import HomeStack from '../features/invoice/screens/homeScreen';
import {
  orgTokenReceived,
  setSplash,
  tokenReceived,
} from '../features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  useFetchMeQuery,
  useLoginMutation,
} from '../features/invoice/invoiceApiSlice';
import {useAppDispatch} from './hooks';

// @ts-ignore
export const AuthContext: any = React.createContext<any>();
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const state: any = useSelector(state => state);
  const dispatch = useAppDispatch();
  const [login, result] = useLoginMutation();
  useFetchMeQuery(result?.data?.access_token, {
    skip: result?.data?.access_token ? false : true,
  });

  React.useEffect(() => {
    setTimeout(async () => {
      const token: string = await AsyncStorage.getItem('@TOKEN');
      const orgToken: string = await AsyncStorage.getItem('@ORGTOKEN');
      if (token) {
        dispatch(tokenReceived(token));
        dispatch(orgTokenReceived(orgToken));
        dispatch(setSplash(false));
      } else {
        dispatch(setSplash(false));
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        if (data.username && data.password) {
          var urlencoded = new URLSearchParams();
          urlencoded.append('grant_type', 'password');
          urlencoded.append('scope', 'openid');
          urlencoded.append('client_id', CLIENT_ID);
          urlencoded.append('client_secret', CLIENT_SECRET);
          urlencoded.append('username', encodeURIComponent(data.username));
          urlencoded.append('password', data.password);
          login(urlencoded.toString());
        } else {
          // eslint-disable-next-line no-alert
          alert('Sign in Error');
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('@TOKEN');
        await AsyncStorage.removeItem('@ORGTOKEN');
        dispatch(tokenReceived(null));
        dispatch(orgTokenReceived(null));
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.auth.showSplash ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (state.auth.token === null && state.auth.orgToken === null) ||
            (state.auth.token !== null && state.auth.orgToken === null) ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : state.auth.token !== null && state.auth.orgToken !== null ? (
            <Stack.Screen
              name="Home"
              component={HomeStack}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen name="Splash" component={SplashScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
