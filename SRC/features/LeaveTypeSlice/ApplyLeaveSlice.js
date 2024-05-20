import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const ApplyLeaveAction = createAsyncThunk('ApplyLeave', async values => {
  console.log('valuesApplyLeave', values);
  return axios
    .post(`${APIS.ApplyLeaveAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const ApplyLeaveSlice = createSlice({
  name: 'ApplyLeave',
  initialState,
  reducers: {
    clearAllStateApplyLeave: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(ApplyLeaveAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(ApplyLeaveAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(ApplyLeaveAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllStateApplyLeave} = ApplyLeaveSlice.actions;

export default ApplyLeaveSlice.reducer;
