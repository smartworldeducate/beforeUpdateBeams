import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
};

export const InspireTrainingsAction = createAsyncThunk(
  'InspireSignup',
  async values => {
    console.log('valuesInspireTrainings', values);
    return axios
      .post(`${APIS.InspireTrainings}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const InspireTrainingsSlice = createSlice({
  name: 'InspireSignup',
  initialState,
  reducers: {
    clearAllState: (state, action) => {},
  },

  extraReducers: builder => {
    builder.addCase(InspireTrainingsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(InspireTrainingsAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(InspireTrainingsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = InspireTrainingsSlice.actions;

export default InspireTrainingsSlice.reducer;
