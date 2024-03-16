import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const SalaryHistoryWithYearsAction = createAsyncThunk(
  'SalaryHistoryWithYears',
  async values => {
    console.log('values', values);
    return axios
      .post(`${APIS.SalaryHistoryWithYearsAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          //   'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const SalaryHistoryWithYearsSlice = createSlice({
  name: 'SalaryHistoryWithYears',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    clearSalaryHistoryList: (state, action) => {
      state.userData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(SalaryHistoryWithYearsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(SalaryHistoryWithYearsAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(SalaryHistoryWithYearsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState, clearSalaryHistoryList} =
  SalaryHistoryWithYearsSlice.actions;

export default SalaryHistoryWithYearsSlice.reducer;
