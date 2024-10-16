export const BASE_URL = 'https://ws.beaconhouse.net/beams_ci/index.php/api/';
// 'https://b2training.beaconhouse.net/beams_ci/index.php/api/';

export const BASE_INSPIRE_URL =
  'https://ws.beaconhouse.net/beams_ci/index.php/inspire/';

export const config = {
  headers: {
    api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
    api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
  },
};

export const APIS = {
  LoginAPI: BASE_URL + 'login',
  ProfileAPI: BASE_URL + 'user_profile',
  FinancialAPI: BASE_URL + 'salaryEmpHistory',
  LastMonthSalaryAPI: BASE_URL + 'emp_last_salary',
  SalaryYearsAPI: BASE_URL + 'employee_years',
  SalaryHistoryWithYearsAPI: BASE_URL + 'salary_history_year',
  AppraisalYearsAPI: BASE_URL + 'selectAppraisal',
  ObjectivesYearsAPI: BASE_URL + 'apprasal_years',
  ObjectivesAPI: BASE_URL + 'objective',

  DevelopmentAreaAPI: BASE_URL + 'development_area',

  TimeLineAPI: BASE_URL + 'gettimeline',
  ReporteesAPI: BASE_URL + 'getReportee',

  GetRatingAPI: BASE_URL + 'get_rating',
  UpdateRatingAPI: BASE_URL + 'update_rating',
  SuggestionFeedbackAPI: BASE_URL + 'feedback',

  LeaveBalanceAPI: BASE_URL + 'balance_leave',
  LeaveHistoryAPI: BASE_URL + 'leave_history',

  SearchEmployeeAPI: BASE_URL + 'searchByName',

  SearchMessagesAPI: BASE_URL + 'search_message',
  MessagesAPI: BASE_URL + 'selectMesage',
  MessagesDetailAPI: BASE_URL + 'selectMesageDetail',

  MessagesReadAPI: BASE_URL + 'message_like',

  MessagesStatusLikeAPI: BASE_URL + 'status_like',
  FavouriteMessagesAPI: BASE_URL + 'get_favroit_messages',
  AddToFavouriteMessagesAPI: BASE_URL + 'add_to_favrit_message',
  ArchiveMessagesAPI: BASE_URL + 'get_archive_messages',
  AddToArchiveMessagesAPI: BASE_URL + 'add_to_archive_message',

  UtilityAPI: BASE_URL + 'utility',

  UtilityMiscLogAPI: BASE_URL + 'misc_utility_log',

  FinYearAPI: BASE_URL + 'fin_year',

  WorkFromHomeGetAPI: BASE_URL + 'wfh',
  WorkFromHomePostAPI: BASE_URL + 'wfhinsert',

  AttendaceCalanderAPI: BASE_URL + 'attendance_calendar',

  LeaveTypeAPI: BASE_URL + 'leave_type_new',
  ApplyLeaveAPI: BASE_URL + 'apply_leave',

  LeaveTypesArrayAPI: 'leave_types_array',

  OutstationAPI: BASE_URL + 'apply_outstation_send',

  AttendenceNotMarkedAPI: BASE_URL + 'apply_attendance_not_marked',

  LateArrivalAPI: BASE_URL + 'apply_late_arrival',

  EarlyLeavingAPI: BASE_URL + 'apply_early_leaving',

  ToilAPI: BASE_URL + 'apply_toil_application',

  QRScanAPI: BASE_URL + 'qr_scan',
  QRScannerListAPI: BASE_URL + 'qr_scanner_list',

  FinancialYearsForTax: BASE_URL + 'tax_financial_years',

  FinancialYearsForPF: BASE_URL + 'pf_financial_years',

  FinancialTaxPDFDownload: BASE_URL + 'print_tax_certificate',

  FinancialPFPDFDownload: BASE_URL + 'print_provident_fund',

  DeviceInfoEmail: BASE_URL + 'send_email',

  NotificationsMessages: BASE_URL + 'notification_mesages',

  InspireSignUp: BASE_INSPIRE_URL + 'inspire_home',

  InspireSignUpContinue: BASE_INSPIRE_URL + 'inspire_signup',

  InspireTrainings: BASE_INSPIRE_URL + 'inspire_trainings',

  InspireAddTraining: BASE_INSPIRE_URL + 'inspire_add_training',

  InspireAddTrainingOnForm: BASE_INSPIRE_URL + 'inspire_save_training',
};
