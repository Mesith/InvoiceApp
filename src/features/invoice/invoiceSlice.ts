import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {and} from 'react-native-reanimated';
import {apiSlice} from './invoiceApiSlice';

// Invoice related  API state handle here . for example when scrolled down to list and
// reached the end of the list. that state handle form here to handle pagination.

interface InvoiceState {
  isListEnd: boolean;
  invoiceCreated: boolean;
}

const initialState: InvoiceState = {
  isListEnd: false,
  invoiceCreated: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceListEnd(state, action: PayloadAction<boolean>) {
      state.isListEnd = action.payload;
    },
    setInvoiceCreated(state, action: PayloadAction<boolean>) {
      state.invoiceCreated = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.fetchInvoices.matchFulfilled,
      state => {
        state.isListEnd = false;
      },
    );
    builder.addMatcher(
      apiSlice.endpoints.createInvoice.matchFulfilled,
      state => {
        state.invoiceCreated = true;
      },
    );
  },
});

export const {setInvoiceListEnd, setInvoiceCreated} = invoiceSlice.actions;
export default invoiceSlice.reducer;
