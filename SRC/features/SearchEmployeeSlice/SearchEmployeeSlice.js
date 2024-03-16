import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
  resultLength: null,
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
    clearSearchData: (state, action) => {
      state.userData = [];
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
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
      state.resultLength = action.payload.data.data_length;
    });
  },
});

export const {clearAllState, clearSearchData} = SearchEmployeeSlice.actions;

export default SearchEmployeeSlice.reducer;
