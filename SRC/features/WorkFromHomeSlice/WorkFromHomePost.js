import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';
import {WorkFromHomeAction} from './WorkFromHomeGet';
import {useDispatch, useSelector} from 'react-redux';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const WorkFromHomePostAction = createAsyncThunk(
  'WFHPost',
  async values => {
    console.log('values', values);

    return axios
      .post(`${APIS.WorkFromHomePostAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);

    // const result = await axios.post(`${APIS.WorkFromHomePostAPI}`, values, {
    //   headers: {
    //     api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
    //     api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    // console.log('result', result);
    // console.log('resultData', result.data);
    // console.log('resultDataSuccess', result.data.success);

    // if (result?.data?.success == 1) {
    //   const dispatch = useDispatch();
    //   console.log('values', values);
    //   console.log('resultInIf', result?.data?.success);
    //   dispatch(
    //     WorkFromHomeAction({
    //       employee_id: values?.employee_id,
    //     }),
    //   );
    // }

    // if (result.data.success == 1) {

    //   if (values?.getChiled) {
    //     dispatch(WorkFromHomeAction(values?.user_number));
    //   }
    // }

    // return result.data;
    // .then(response => response.data);
  },
);

const WorkFromHomePostSlice = createSlice({
  name: 'WFHPost',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(WorkFromHomePostAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(WorkFromHomePostAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(WorkFromHomePostAction.fulfilled, (state, action) => {
      // console.log('actionPayload', action.payload);
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = WorkFromHomePostSlice.actions;

export default WorkFromHomePostSlice.reducer;
