import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';
import {apiSlice} from '../features/invoice/invoiceApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // eslint-disable-next-line @typescript-eslint/no-shadow
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

store.subscribe(() => {

  if (store.getState().auth.token) {
    AsyncStorage.setItem('@TOKEN', store.getState().auth.token!!);
  }
  if (store.getState().auth.orgToken) {
    AsyncStorage.setItem('@ORGTOKEN', store.getState().auth.orgToken!!);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
