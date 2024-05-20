import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  userDataViewAll: [],

  isLoading: true,
  pageOffset: 1,
  isEmptyData: false,
  dataLength: null,

  unReadLength: null,
};

export const searchMessageAction = createAsyncThunk(
  'MessageSearch',
  async values => {
    console.log('messageSearchValues', values);
    return axios
      .post(`${APIS.SearchMessagesAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const MessageSearchSlice = createSlice({
  name: 'MessageSearch',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    clearViewAllSearchMessagesState: (state, action) => {
      console.log('clearViewAllSearchMessagesState');
      state.userData = [];
      state.userDataViewAll = [];
    },

    textColrSearchData: (state, action) => {
      console.log('payLoadMsgId', action.payload);
      const list = state.userDataViewAll;
      const indx = list?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_READ_STATUS = 'Y';
      }
    },

    addToFavouriteSearchData: (state, action) => {
      console.log('payLoadMsgId', action.payload);
      const listAll = state.userDataViewAll;
      // console.log('listAll', listAll);
      const indx = listAll?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_FAVROIT = 'Y';
      }
    },

    removeFromFavouriteSearchData: (state, action) => {
      const listAll = state.userDataViewAll;
      const indx = listAll?.findIndex(item => item?.MSG_ID == action?.payload);
      if (indx !== -1) {
        state.userDataViewAll[indx].IS_FAVROIT = 'N';
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(searchMessageAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(searchMessageAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(searchMessageAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;

      state.dataLength = action.payload.data?.length;

      state.userDataViewAll = [
        ...state.userDataViewAll,
        ...action.payload.data,
      ];
    });
  },
});

export const {
  clearAllState,
  textColrSearchData,
  addToFavouriteSearchData,
  removeFromFavouriteSearchData,
  clearViewAllSearchMessagesState,
} = MessageSearchSlice.actions;

export default MessageSearchSlice.reducer;
