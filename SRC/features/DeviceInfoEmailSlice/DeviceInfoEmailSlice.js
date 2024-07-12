import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  isLoading: false,
};

export const DeviceInfoEmailAction = createAsyncThunk(
  'DeviceInfo',
  async values => {
    console.log('valuesDeviceInfo', values);
    return axios
      .post(`${APIS.DeviceInfoEmail}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        },
      })
      .then(response => response.data);
  },
);

const DeviceInfoSlice = createSlice({
  name: 'DeviceInfo',
  initialState,
  reducers: {
    clearAllStateDeviceInfoEmail: (state, action) => {
      state.success = null;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(DeviceInfoEmailAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(DeviceInfoEmailAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(DeviceInfoEmailAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    });
  },
});

export const {clearAllStateDeviceInfoEmail} = DeviceInfoSlice.actions;

export default DeviceInfoSlice.reducer;
