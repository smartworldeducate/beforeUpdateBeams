import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const FinancialYearsForTaxAction = createAsyncThunk(
  'FinancialYearsTax',
  async values => {
    console.log('valuesFinancialYearsForTax', values);
    return axios
      .post(`${APIS.FinancialYearsForTax}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const FinancialYersForTaxSlice = createSlice({
  name: 'FinancialYearsTax',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(FinancialYearsForTaxAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(FinancialYearsForTaxAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(FinancialYearsForTaxAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = FinancialYersForTaxSlice.actions;

export default FinancialYersForTaxSlice.reducer;
