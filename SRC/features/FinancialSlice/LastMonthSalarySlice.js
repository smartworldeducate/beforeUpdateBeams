import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const LastMonthSalaryAction = createAsyncThunk(
  'LastMonthSalary',
  async values => {
    console.log('valuesLastMonthSalary', values);
    return axios
      .post(`${APIS.LastMonthSalaryAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const LastMonthSalarySlice = createSlice({
  name: 'LastMonthSalary',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(LastMonthSalaryAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(LastMonthSalaryAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(LastMonthSalaryAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = LastMonthSalarySlice.actions;

export default LastMonthSalarySlice.reducer;
