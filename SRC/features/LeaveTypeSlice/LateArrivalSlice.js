import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const LateArrivalAction = createAsyncThunk(
  'LateArrival',
  async values => {
    console.log('valuesLateArrival', values);
    return axios
      .post(`${APIS.LateArrivalAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        },
      })
      .then(response => response.data);
  },
);

const LateArrivalSlice = createSlice({
  name: 'LateArrival',
  initialState,
  reducers: {
    clearAllStateLateArrival: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(LateArrivalAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(LateArrivalAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(LateArrivalAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllStateLateArrival} = LateArrivalSlice.actions;

export default LateArrivalSlice.reducer;
