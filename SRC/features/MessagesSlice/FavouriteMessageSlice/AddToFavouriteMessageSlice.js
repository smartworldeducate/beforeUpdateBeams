import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
};

export const addToFavouriteMessagesAction = createAsyncThunk(
  'AddToFavouriteMessages',
  async values => {
    console.log('valuesAddToFavourite', values);
    return axios
      .post(`${APIS.AddToFavouriteMessagesAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const FavouriteMessagesSlice = createSlice({
  name: 'AddToFavouriteMessages',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(addToFavouriteMessagesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addToFavouriteMessagesAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(addToFavouriteMessagesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = FavouriteMessagesSlice.actions;

export default FavouriteMessagesSlice.reducer;
