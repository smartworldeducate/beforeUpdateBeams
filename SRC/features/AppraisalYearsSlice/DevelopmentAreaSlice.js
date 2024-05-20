import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  questionData: [],
  isLoading: false,
};

export const developmentAreaAction = createAsyncThunk(
  'developmentArea',
  async values => {
    console.log('developmentAreaValues', values);
    return axios
      .post(`${APIS.DevelopmentAreaAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const developmentAreaSlice = createSlice({
  name: 'developmentArea',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(developmentAreaAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(developmentAreaAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(developmentAreaAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
      state.questionData = action.payload.question_data;
    });
  },
});

export const {clearAllState} = developmentAreaSlice.actions;

export default developmentAreaSlice.reducer;
