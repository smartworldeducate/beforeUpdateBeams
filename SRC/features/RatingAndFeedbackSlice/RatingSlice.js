import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
  rating: null,
};

export const RatingAction = createAsyncThunk('Rating', async values => {
  console.log('values', values);
  return axios
    .post(`${APIS.GetRatingAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data);
});

const RatingSlice = createSlice({
  name: 'Rating',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    updateRating: (state, action) => {
      console.log('setRatingStore', action.payload);
      state.rating = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(RatingAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(RatingAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(RatingAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
      state.rating = action.payload.data.RATING_ID;
    });
  },
});

export const {clearAllState, updateRating} = RatingSlice.actions;

export default RatingSlice.reducer;
