import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const UtilityMiscLogAction = createAsyncThunk(
  'UtilityMiscLog',
  async values => {
    console.log('values', values);
    return axios
      .post(`${APIS.UtilityMiscLogAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        },
      })
      .then(response => response.data);
  },
);

const UtilityMiscLogSlice = createSlice({
  name: 'UtilityMiscLog',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(UtilityMiscLogAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(UtilityMiscLogAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(UtilityMiscLogAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.status;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = UtilityMiscLogSlice.actions;

export default UtilityMiscLogSlice.reducer;
