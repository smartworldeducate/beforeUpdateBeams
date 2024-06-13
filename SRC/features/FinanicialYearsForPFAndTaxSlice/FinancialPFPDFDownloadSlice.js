import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const FinancialPFPDFDownloadAction = createAsyncThunk(
  'FinancialPFDownload',
  async values => {
    console.log('valuesFinancialPFPDFDownload', values);
    return axios
      .post(`${APIS.FinancialPFPDFDownload}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const FinancialPFPDFDownloadSlice = createSlice({
  name: 'FinancialPFDownload',
  initialState,
  reducers: {
    clearStatePFPDFDownload: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(FinancialPFPDFDownloadAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(FinancialPFPDFDownloadAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(FinancialPFPDFDownloadAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearStatePFPDFDownload} = FinancialPFPDFDownloadSlice.actions;

export default FinancialPFPDFDownloadSlice.reducer;
