import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',

  userDataViewAll: [],

  isLoading: false,
  pageOffset: 1,
  dataLength: null,

  unReadLength: null,
};

export const SearchEmployeeAction = createAsyncThunk(
  'SearchEmployee',
  async values => {
    console.log('values', values);
    return axios
      .post(`${APIS.SearchEmployeeAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const SearchEmployeeSlice = createSlice({
  name: 'SearchEmployee',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    increaseOffset: (state, action) => {
      state.pageOffset += 1;
    },
    clearViewAllSearchEmployeeState: (state, action) => {
      console.log('clearViewAllSearchEmployeeState');
      state.userDataViewAll = [];
      state.dataLength = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(SearchEmployeeAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(SearchEmployeeAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(SearchEmployeeAction.fulfilled, (state, action) => {
      // console.log('API Response:', action.payload);
      // if (action.payload && Array.isArray(action.payload.data)) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;

      state.dataLength = action.payload.data.length;

      state.userDataViewAll = [
        ...state.userDataViewAll,
        ...action.payload.data,
      ];
      // }
    });
  },
});

export const {clearAllState, increaseOffset, clearViewAllSearchEmployeeState} =
  SearchEmployeeSlice.actions;

export default SearchEmployeeSlice.reducer;
