import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';
import {pushObjectInFavourite} from './FavouriteMessageSlice/FavouriteMessageSlice';
import {useSelector, useDispatch} from 'react-redux';

const initialState = {
  success: null,
  message: '',
  userData: [],
  userDataViewAll: [],
  unReadLength: null,

  isLoading: true,
  pageOffset: 1,
  isEmptyData: false,
  dataLength: null,
};

export const messagesAction = createAsyncThunk('Messages', async values => {
  console.log('valuesEmpMessages', values);
  return axios
    .post(`${APIS.MessagesAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data);
});

const MessagesSlice = createSlice({
  name: 'Messages',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    increaseOffset: (state, action) => {
      state.pageOffset += 1;
    },

    clearViewAllMessagesState: (state, action) => {
      console.log('clearViewAllMessagesState');
      state.userDataViewAll = [];
    },

    pushObject: (state, action) => {
      // const dispatch = useDispatch();
      // console.log('payLoadMsg', action.payload);
      // const myData = action.payload;
      // console.log('myData', myData);
      // dispatch(pushObjectInFavourite());
      // console.log('userDataViewAll in pushNowData:', userDataViewAll);
      // state.userData.push(...action.payload);
      // console.log('Received data:', action.payload);
      // state.userDataViewAll = state.userDataViewAll.filter(
      //   item => item.MSG_ID != action.payload,
      // );
      // const listDataHere = state.userDataViewAll;
      // const indxToRemove = listDataHere?.findIndex(
      //   item => item?.MSG_ID == action?.payload,
      // );
      // const indexToRemove = state.userDataViewAll.findIndex(
      //   item => item.MSG_ID === action.payload,
      // );
      // if (indxToRemove != -1) {
      //   state.userDataViewAll.splice(indxToRemove, 1);
      // }
    },

    textColr: (state, action) => {
      console.log('payLoadMsgId', action.payload);
      const list = state.userDataViewAll;
      // console.log('list', list);
      const indx = list?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_READ_STATUS = 'Y';
      }
    },

    addToFavourite: (state, action) => {
      console.log('payLoadMsgId', action.payload);
      const listAll = state.userDataViewAll;
      // console.log('listAll', listAll);
      const indx = listAll?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_FAVROIT = 'Y';
      }
    },

    removeFromFavourite: (state, action) => {
      // console.log('payLoadMsgId', action.payload);
      const listAll = state.userDataViewAll;
      // console.log('listAll', listAll);
      const indx = listAll?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        // console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_FAVROIT = 'N';
      }
    },

    removeForArchiveFromAllMessages: (state, action) => {
      // console.log('payLoadMsgId', action.payload);
      const listAll = state.userDataViewAll;

      const indexToRemove = listAll?.findIndex(
        item => item?.MSG_ID == action?.payload,
      );

      if (indexToRemove !== -1) {
        // console.log('payLoadValue', action.payload);
        state.userDataViewAll.splice(indexToRemove, 1);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(messagesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(messagesAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(messagesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;

      state.unReadLength = action.payload.unread_message_length;

      state.dataLength = action.payload.data?.length;

      // state.userDataViewAll = action.payload.data;

      state.userDataViewAll = [
        ...state.userDataViewAll,
        ...action.payload.data,
      ];

      // state.isEmptyData = action.payload.data.length == 0 ? true : false;

      // if (state.userDataViewAll.length === 0) {
      //   console.log('length0');
      //   state.userDataViewAll = action.payload.data;
      // } else {
      //   // console.log('lengthMore');
      //   // console.log('payLoadMore', action.payload.data);
      //   state.userDataViewAll = [
      //     ...state.userDataViewAll,
      //     ...action.payload.data,
      //   ];
      // }
    });
  },
});

export const {
  clearAllState,
  increaseOffset,
  clearViewAllMessagesState,
  pushObject,
  textColr,
  addToFavourite,
  removeFromFavourite,
  removeForArchiveFromAllMessages,
} = MessagesSlice.actions;

export default MessagesSlice.reducer;
