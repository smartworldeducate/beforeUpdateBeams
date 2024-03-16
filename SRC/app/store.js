import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/users/userSlice';
import loginReducer from '../features/register/loginSlice';
import tagReducer from '../features/tags/tagSlice';
import singleTagReducer from '../features/tagsingle/singletagSlice';
import catReducer from '../features/category/allCatSlice';
import filterReducer from '../features/category/singleCatSlice';
import scanReducer from '../features/scan/scanSlice';
import LoginUserReducer from '../features/register/googleLoginSlice';
import userReducer from '../features/admin/adminSlice';
import googleReducer from '../features/register/googleLoginSlice';
import createReducer from '../features/createTag/createSlice';
import searchReducer from '../features/emplolyee/createSlice';
import reporteeReeducer from '../features/reportee/createSlice';
import employeeRerducer from '../features/allemoloyee/createSlice';
import currentEmpDateReducer from '../features/currntdataofemployee/createSlice';
import lineMangerReducer from '../features/lineManager/createSlice';
import salMonthReducer from '../features/salmonth/createSlice';
import empSalReducer from '../features/empSalary/createSlice';
import empMessageReducer from '..//features/message/createSlice';
import detailMessageReducer from '../features/detailMessage/createSlice';
import historyReducer from '../features/history/createSlice';
import appraisalReducer from '../features/appraisal/createSlice';
import bssChildReducer from '../features/childbss/createSlice';
import feedbackReducer from '../features/feeback/createSlice';
import ratingReducer from '../features/rating/createSlice';
import getRatingReducer from '../features/getallrating/createSlice';
import updateRatingReducer from '../features/updaterating/createSlice';
import utilityReducer from '../features/utility/createSlice';
import wfhReducer from '../features/wfh/createSlice';
import wfhInsertReducer from '../features/insertwfh/createSlice';
import timeLineReducer from '../features/timeline/createSlice';
import profileReducer from '../features/profile/createSlice';
import movementReducer from '../features/movement/createSlice';
import leaveBalanceReducer from '../features/balanceleave/createSlice';

import loginSliceReducer from '../features/loginSlice/loginSlice';
import profileSliceReducer from '../features/profileSlice/profileSlice';
import financialSliceReducer from '../features/FinancialSlice/FinancialSlice';
import salaryYearsSliceReducer from '../features/SalaryYearsSlice/SalaryYearsSlice';
import salaryHistoryWithYearsSliceReducer from '../features/SalaryYearsSlice/SalaryHistoryWithYearsSlice';
import appraisalYearsSliceReducer from '../features/AppraisalYearsSlice/AppraisalYearsSlice';
import objectiveYearsSliceReducer from '../features/AppraisalYearsSlice/ObjectivesYearsSlice';
import objectivesSliceReducer from '../features/ObjectivesSlice/ObjectivesSlice';

import timelineSliceReducer from '../features/TimeLineSlice/TimeLineSlice';
import allReportessSliceReducer from '../features/ReporteeSectionSlice/AllReportessSlice';
import reporteeProfileSliceReducer from '../features/ReporteeSectionSlice/ReporteeProfileSlice';
import searchEmployeeSliceReducer from '../features/SearchEmployeeSlice/SearchEmployeeSlice';

import ratingSliceReducer from '../features/RatingAndFeedbackSlice/RatingSlice';
import updateRatingSliceReducer from '../features/RatingAndFeedbackSlice/UpdateRatingSlice';
import suggestionFeedbackSliceReducer from '../features/RatingAndFeedbackSlice/SuggestionFeedback';

import leaveBalanceSliceReducer from '../features/LeaveBalanceSlice/LeaveBalanceSlice';

import messagesSliceReducer from '../features/MessagesSlice/MessagesSlice';
import messageDetailSliceReducer from '../features/MessagesSlice/MessageDetailSlice';

import UtilitySliceReducer from '../features/UtilitySlice/UtilitySlice';

export const store = configureStore({
  reducer: {
    register: authReducer,
    login: loginReducer,
    getAllTags: tagReducer,
    singleTag: singleTagReducer,
    getAllCats: catReducer,
    getCatFilter: filterReducer,
    scanar: scanReducer,
    userLogin: LoginUserReducer,
    userList: userReducer,
    googleUser: googleReducer,
    createtag: createReducer,
    searchEmp: searchReducer,
    reportee: reporteeReeducer,
    allEmployee: employeeRerducer,
    currntEmpAttanence: currentEmpDateReducer,
    getLineManger: lineMangerReducer,
    getSalMonth: salMonthReducer,
    getEmpSalary: empSalReducer,
    empMessageState: empMessageReducer,
    detailMessageState: detailMessageReducer,
    selectHistory: historyReducer,
    appraisalState: appraisalReducer,
    childState: bssChildReducer,
    feedBackState: feedbackReducer,
    ratingState: ratingReducer,
    getallRating: getRatingReducer,
    updateRatingState: updateRatingReducer,
    utilityState: utilityReducer,
    wfhState: wfhReducer,
    wfhInsertState: wfhInsertReducer,
    timeLineState: timeLineReducer,
    profileState: profileReducer,
    movementState: movementReducer,
    leaveBalanceState: leaveBalanceReducer,

    loginStore: loginSliceReducer,
    profileStore: profileSliceReducer,
    financialStore: financialSliceReducer,
    salaryYearsStore: salaryYearsSliceReducer,
    salaryHistoryWithYearsStore: salaryHistoryWithYearsSliceReducer,
    appraisalYearsStore: appraisalYearsSliceReducer,
    objectiveYearsStore: objectiveYearsSliceReducer,
    objectivesStore: objectivesSliceReducer,

    timeLineStore: timelineSliceReducer,
    allReporteesStore: allReportessSliceReducer,
    reporteeProfileStore: reporteeProfileSliceReducer,
    searchEmployyeStore: searchEmployeeSliceReducer,
    ratingStore: ratingSliceReducer,
    updateRatingStore: updateRatingSliceReducer,

    suggestionFeedbackStore: suggestionFeedbackSliceReducer,
    leaveBalanceStore: leaveBalanceSliceReducer,
    messagesStore: messagesSliceReducer,
    messageDetailStore: messageDetailSliceReducer,
    utilityStore: UtilitySliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
