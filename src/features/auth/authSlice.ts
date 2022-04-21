import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiSlice} from '../invoice/invoiceApiSlice';

// Auth related redux actons handle here

interface AuthState {
  token: string | null;
  showSplash: boolean;
  orgToken: string;
  authLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  orgToken: null,
  showSplash: true,
  authLoading: false,
};

const authSclice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenReceived(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    orgTokenReceived(state, action: PayloadAction<string>) {
      state.orgToken = action.payload;
    },
    setSplash(state, action: PayloadAction<boolean>) {
      state.showSplash = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        state.token = payload.access_token;
      },
    );
    builder.addMatcher(
      apiSlice.endpoints.fetchMe.matchFulfilled,
      (state, {payload}) => {
        state.orgToken =
          Array.isArray(payload.data.memberships) && payload.data.memberships[0]
            ? payload.data.memberships[0].token
            : null;
      },
    );
    builder.addMatcher(apiSlice.endpoints.login.matchPending, state => {
      state.authLoading = true;
    });
    builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, state => {
      state.authLoading = false;
    });
    builder.addMatcher(apiSlice.endpoints.login.matchRejected, state => {
      state.authLoading = false;
    });
    builder.addMatcher(apiSlice.endpoints.fetchMe.matchPending, state => {
      state.authLoading = true;
    });
    builder.addMatcher(apiSlice.endpoints.fetchMe.matchFulfilled, state => {
      state.authLoading = false;
    });
    builder.addMatcher(apiSlice.endpoints.fetchMe.matchRejected, state => {
      state.authLoading = false;
    });
  },
});

export const {tokenReceived, orgTokenReceived, setSplash} = authSclice.actions;
export default authSclice.reducer;
