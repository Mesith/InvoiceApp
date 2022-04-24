import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../../app/store';

export const CLIENT_ID = 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa';
export const CLIENT_SECRET = '0Exp4dwqmpON_ezyhfm0o_Xkowka';

// All API end points defind here. execute usig RTK query

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export interface UserResponse {
  expires_in: number;
  access_token: string;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://sandbox.101digital.io',
  prepareHeaders(headers, {getState}) {
    const token = (getState() as RootState).auth.token;
    const orgToken = (getState() as RootState).auth.orgToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (orgToken) {
      headers.set('org-token', orgToken);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
      login: builder.mutation<UserResponse, string>({
        query: credentials => ({
          url: 'token?tenentDomain=carbon.super',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          body: credentials,
        }),
      }),
      fetchMe: builder.query<any, any>({
        query(accessToken: string) {
          return {
            url: 'membership-service/1.2.0/users/me',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      }),
      fetchInvoices: builder.query<any[], number | void>({
        // can pass the other parameters as user inputs ex: ordering / Date, as user inputs. not implemented for the this step
        query(pageNumber: number) {
          return `invoice-service/1.0.0/invoices?pageNum=${pageNumber}&pageSize=10&dateType=INVOICE_DATE&sortBy=CREATED_DATE&ordering=ASCENDING`;
        },
      }),
      createInvoice: builder.mutation<any, any>({
        query: data => ({
          url: 'invoice-service/2.0.0/invoices',
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: data,
        }),
      }),
    };
  },
});

export const {
  useFetchBreedsQuery,
  useFetchInvoicesQuery,
  useLoginMutation,
  useFetchMeQuery,
  useCreateInvoiceMutation,
} = apiSlice;
