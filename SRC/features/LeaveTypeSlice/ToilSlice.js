import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const ToilLeaveAction = createAsyncThunk('ToilLeave', async values => {
  console.log('valuesToilLeave', values);
  return axios
    .post(`${APIS.ToilAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const ToilLeaveSlice = createSlice({
  name: 'ToilLeave',
  initialState,
  reducers: {
    clearAllStateToilleave: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(ToilLeaveAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(ToilLeaveAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(ToilLeaveAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllStateToilleave} = ToilLeaveSlice.actions;

export default ToilLeaveSlice.reducer;
