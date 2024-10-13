import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
};

export const InspireSignupContinueAction = createAsyncThunk(
  'InspireSignup',
  async values => {
    console.log('valuesInspireSignupContinue', values);
    return axios
      .post(`${APIS.InspireSignUpContinue}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const InspireSignupSlice = createSlice({
  name: 'InspireSignup',
  initialState,
  reducers: {
    clearAllState: (state, action) => {},
  },

  extraReducers: builder => {
    builder.addCase(InspireSignupContinueAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(InspireSignupContinueAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(InspireSignupContinueAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = InspireSignupSlice.actions;

export default InspireSignupSlice.reducer;
