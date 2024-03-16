import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const UtilityAction = createAsyncThunk('Utility', async values => {
  console.log('values', values);
  return axios
    .post(`${APIS.UtilityAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const UtilitySlice = createSlice({
  name: 'Utility',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(UtilityAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(UtilityAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(UtilityAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = UtilitySlice.actions;

export default UtilitySlice.reducer;
