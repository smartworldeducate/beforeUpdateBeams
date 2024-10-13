import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
};

export const InspireAddTrainingAction = createAsyncThunk(
  'InspireAddTraining',
  async values => {
    console.log('valuesInspireAddTraining', values);
    return axios
      .post(`${APIS.InspireAddTraining}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const InspireAddTrainingSlice = createSlice({
  name: 'InspireAddTraining',
  initialState,
  reducers: {
    clearAllState: (state, action) => {},
  },

  extraReducers: builder => {
    builder.addCase(InspireAddTrainingAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(InspireAddTrainingAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(InspireAddTrainingAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = InspireAddTrainingSlice.actions;

export default InspireAddTrainingSlice.reducer;
