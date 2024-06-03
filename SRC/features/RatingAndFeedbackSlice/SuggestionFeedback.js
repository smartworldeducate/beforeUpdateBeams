import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const SuggestionFeedbackAction = createAsyncThunk(
  'SuggestionFeedback',
  async values => {
    console.log('valuesFeedbackSuggestion', values);
    return axios
      .post(`${APIS.SuggestionFeedbackAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const SuggestionFeedbackSlice = createSlice({
  name: 'SuggestionFeedback',
  initialState,
  reducers: {
    clearAllStateSuggestionFeedback: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(SuggestionFeedbackAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(SuggestionFeedbackAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(SuggestionFeedbackAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllStateSuggestionFeedback} =
  SuggestionFeedbackSlice.actions;

export default SuggestionFeedbackSlice.reducer;
