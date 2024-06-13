import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const FinancialTaxPDFDownloadAction = createAsyncThunk(
  'FinancialPDFDownload',
  async values => {
    console.log('valuesFinancialTaxPDFDownload', values);
    return axios
      .post(`${APIS.FinancialTaxPDFDownload}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const FinancialTaxPDFDownloadSlice = createSlice({
  name: 'FinancialPDFDownload',
  initialState,
  reducers: {
    clearStateTaxPDFDownload: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(FinancialTaxPDFDownloadAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(FinancialTaxPDFDownloadAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(
      FinancialTaxPDFDownloadAction.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.userData = action.payload.data;
      },
    );
  },
});

export const {clearStateTaxPDFDownload} = FinancialTaxPDFDownloadSlice.actions;

export default FinancialTaxPDFDownloadSlice.reducer;
