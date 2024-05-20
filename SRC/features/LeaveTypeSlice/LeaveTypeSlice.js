import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const LeaveTypeAction = createAsyncThunk('LeaveType', async values => {
  console.log('valuesLeaveTypes', values);
  return axios
    .post(`${APIS.LeaveTypeAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const LeaveTypeSlice = createSlice({
  name: 'LeaveType',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(LeaveTypeAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(LeaveTypeAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(LeaveTypeAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = LeaveTypeSlice.actions;

export default LeaveTypeSlice.reducer;
