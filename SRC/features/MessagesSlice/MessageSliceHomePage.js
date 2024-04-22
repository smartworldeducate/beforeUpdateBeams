import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  isLoading: true,
  userData: [],
};

export const messagesActionHomePage = createAsyncThunk(
  'MessagesHomePage',
  async values => {
    console.log('valuesMessagesHomePage', values);
    return axios
      .post(`${APIS.MessagesAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const MessagesSliceHomePage = createSlice({
  name: 'MessagesHomePage',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(messagesActionHomePage.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(messagesActionHomePage.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(messagesActionHomePage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = MessagesSliceHomePage.actions;

export default MessagesSliceHomePage.reducer;
