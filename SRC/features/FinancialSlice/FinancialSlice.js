import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const FinancialAction = createAsyncThunk('Financial', async values => {
  console.log('values', values);
  return axios
    .post(`${APIS.FinancialAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data);
});

const FinancialSlice = createSlice({
  name: 'Financial',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(FinancialAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(FinancialAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(FinancialAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = FinancialSlice.actions;

export default FinancialSlice.reducer;