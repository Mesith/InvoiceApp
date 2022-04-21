import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { and } from 'react-native-reanimated';
import {apiSlice} from './invoiceApiSlice';

// Invoice related  API state handle here . for example when scrolled down to list and
// reached the end of the list. that state handle form here to handle pagination.

interface InvoiceState {
  isListEnd: boolean;
}

const initialState: InvoiceState = {
  isListEnd: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceListEnd(state, action: PayloadAction<boolean>) {
      state.isListEnd = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.fetchInvoices.matchFulfilled,
      state => {
        state.isListEnd = false;
      },
    );
  },
});

export const {setInvoiceListEnd} = invoiceSlice.actions;
export default invoiceSlice.reducer;
