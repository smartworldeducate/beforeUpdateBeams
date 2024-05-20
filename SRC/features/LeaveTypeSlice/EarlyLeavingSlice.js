import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const EarlyLeavingAction = createAsyncThunk(
  'EarlyLeaving',
  async values => {
    console.log('valuesEarlyLeaving', values);
    return axios
      .post(`${APIS.EarlyLeavingAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        },
      })
      .then(response => response.data);
  },
);

const EarlyLeavingSlice = createSlice({
  name: 'EarlyLeaving',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(EarlyLeavingAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(EarlyLeavingAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(EarlyLeavingAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = EarlyLeavingSlice.actions;

export default EarlyLeavingSlice.reducer;
