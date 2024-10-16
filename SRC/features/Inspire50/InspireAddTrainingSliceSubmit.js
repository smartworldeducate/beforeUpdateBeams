import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const InspireAddTrainingSubmitAction = createAsyncThunk(
  'InspireAddTrainingSubmit',
  async values => {
    console.log('valuesInspireAddTrainingSubmit', values);
    return axios
      .post(`${APIS.InspireAddTrainingOnForm}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const InspireAddTrainingSubmitSlice = createSlice({
  name: 'InspireAddTrainingSubmit',
  initialState,
  reducers: {
    clearAllStateFormSubmit: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(InspireAddTrainingSubmitAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(InspireAddTrainingSubmitAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(
      InspireAddTrainingSubmitAction.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.userData = action.payload.data;
      },
    );
  },
});

export const {clearAllStateFormSubmit} = InspireAddTrainingSubmitSlice.actions;

export default InspireAddTrainingSubmitSlice.reducer;
