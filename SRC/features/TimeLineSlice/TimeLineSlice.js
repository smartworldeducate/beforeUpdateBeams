import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const TimelineAction = createAsyncThunk('Timeline', async values => {
  console.log('values', values);
  return axios
    .post(`${APIS.TimeLineAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const TimeLineSlice = createSlice({
  name: 'Timeline',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(TimelineAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(TimelineAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(TimelineAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = TimeLineSlice.actions;

export default TimeLineSlice.reducer;
