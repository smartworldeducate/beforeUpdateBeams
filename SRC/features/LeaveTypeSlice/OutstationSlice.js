import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const OutstationAction = createAsyncThunk('outstation', async values => {
  console.log('valuesOutstation', values);
  return axios
    .post(`${APIS.OutstationAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const OutstationSlice = createSlice({
  name: 'outstation',
  initialState,
  reducers: {
    clearAllStateOutstationLeave: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(OutstationAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(OutstationAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(OutstationAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllStateOutstationLeave} = OutstationSlice.actions;

export default OutstationSlice.reducer;
