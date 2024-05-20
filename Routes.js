import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './SRC/Screens/Splash';
import WelcomeScreen from './SRC/Screens/WelcomeScreen';
import Login from './SRC/Screens/Login';
import ForgotPassword from './SRC/Screens/ForgotPassword';
import Icon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';

import Home from './SRC/Screens/Home';
import Skip1 from './SRC/Screens/Skip1';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './SRC/Drawer/CustomDrawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeScreen from './SRC/Screens/HomeScreen';
import Profile from './SRC/Screens/Profile';
import ApplicationType from './SRC/Screens/ApplicationType';
import ApplyLeave from './SRC/Screens/ApplyLeave';
import Outstation from './SRC/Screens/Outstation';
import AttendenceNotMarked from './SRC/Screens/AttendenceNotMarked';
import LateArivel from './SRC/Screens/LateArivel';
import EarlyLeaving from './SRC/Screens/EarlyLeaving';
import ToilLeave from './SRC/Screens/ToilLeave';
import Notification from './SRC/Screens/Notification';
import Wfh from './SRC/Screens/Wfh';
import Financial from './SRC/Screens/Financial';
import TimeLine from './SRC/Screens/TimeLine';
import ChildBss from './SRC/Screens/ChildBss';
import FeedBack from './SRC/Screens/FeedBack';
import WorkFromHome from './SRC/Screens/WorkFromHome';
import WFHScreen from './SRC/Screens/WFHScreen';
import Approcial from './SRC/Screens/Approcial';
import Attendance from './SRC/Screens/Attendance';
import Reportee from './SRC/Screens/Reportee';
import TestScreen from './SRC/Screens/TestScreen';
import LeaveBalance from './SRC/Screens/LeaveBalance';
import LeaveHistory from './SRC/Screens/LeaveHistory';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './SRC/Screens/Search';
import Scanner from './SRC/Screens/Scanner';
import Index from './SRC/Screens/Index';
import ScannerDetail from './SRC/Screens/ScannerDetail';
import UtilityTest from './SRC/Screens/UtilityTest';
import Messages from './SRC/Screens/Message';
import MovementLine from './SRC/Screens/MovementLine';

import ViewAllMessages from './SRC/Screens/ViewAllMessages';
import ViewMessageDetail from './SRC/Screens/ViewMessageDetail';
import FavouriteMessages from './SRC/Screens/FavouriteMessages';
import ArchiveMessages from './SRC/Screens/ArchiveMessages';

import QcodeScreen from './SRC/Screens/Qrcode';
import BottomTab from './SRC/Components/CustomTab/BottomTab';

import MessagesTab from './SRC/Components/CustomTab/MessagesTab';

import Utility from './SRC/Screens/Utility';
import QRCodeScreen from './SRC/Screens/QRCodeScreen';

import QRScannerList from './SRC/Screens/QRScannerList';
import AttendenceAndLeaveTab from './SRC/Components/CustomTab/AttendenceAndLeaveTab';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'back',
        drawerStyle: {width: wp('100'), backgroundColor: '#E6E6E6'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
      <Drawer.Screen name="HomeScreenDrawer" component={HomeScreen} />
      <Drawer.Screen
        name="AttendanceDrawer"
        component={AttendenceAndLeaveTabNavigator}
      />
      <Drawer.Screen name="FinancialDrawer" component={Financial} />
      <Drawer.Screen name="TimeLineDrawer" component={TimeLine} />
      <Drawer.Screen name="ReporteeDrawer" component={Reportee} />
      <Drawer.Screen name="ApprocialDrawer" component={Approcial} />
      <Drawer.Screen name="ChildBSSDrawer" component={ChildBss} />
      <Drawer.Screen name="FeedBackDrawer" component={FeedBack} />
      <Drawer.Screen name="UtilityDrawer" component={Utility} />
      <Drawer.Screen name="ProfileDrawer" component={Profile} />
      <Drawer.Screen name="QRScannerListDrawer" component={QRScannerList} />
    </Drawer.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      // headerMode={"none"}
      initialRouteName={'HomeScreenTab'}
      tabBar={props => <BottomTab {...props} />}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}>
      <Tab.Screen name="HomeScreenTab" component={HomeScreen} />
      <Tab.Screen name="LeaveBalanceTab" component={LeaveBalance} />
      <Tab.Screen name="QRCodeScreenTab" component={QRCodeScreen} />
      {/* <Tab.Screen name="ViewAllMessagesTab" component={ViewAllMessages} /> */}
      <Tab.Screen name="AttendanceTab" component={Attendance} />
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
}

function MessagesNavigator() {
  return (
    <Tab.Navigator
      // headerMode={"none"}
      initialRouteName={'ViewAllMessagesTab'}
      tabBar={props => <MessagesTab {...props} />}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}>
      <Tab.Screen name="ViewAllMessagesTab" component={ViewAllMessages} />
      <Tab.Screen name="FavouriteMessagesTab" component={FavouriteMessages} />
      <Tab.Screen name="ArchiveMessagesTab" component={ArchiveMessages} />
    </Tab.Navigator>
  );
}

function AttendenceAndLeaveTabNavigator() {
  return (
    <Tab.Navigator
      // headerMode={"none"}
      initialRouteName={'CalanderAttendanceTab'}
      tabBar={props => <AttendenceAndLeaveTab {...props} />}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}>
      <Tab.Screen name="CalanderAttendanceTab" component={Attendance} />
      <Tab.Screen name="ApplicationTypeTab" component={ApplicationType} />
      <Tab.Screen name="LeaveBalanceTab" component={LeaveBalance} />
      <Tab.Screen name="LeaveHistoryTab" component={LeaveHistory} />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Skip1" component={Skip1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="HomeScreen" component={DrawerStack} />
        <Stack.Screen name="LeaveBalance" component={LeaveBalance} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ViewAllMessages" component={MessagesNavigator} />
        <Stack.Screen name="ViewMessageDetail" component={ViewMessageDetail} />
        <Stack.Screen name="MovementLine" component={MovementLine} />
        <Stack.Screen name="ChildBSS" component={ChildBss} />

        <Stack.Screen name="WorkFromHome" component={WorkFromHome} />
        <Stack.Screen name="WFHScreen" component={WFHScreen} />
        <Stack.Screen name="LeaveHistory" component={LeaveHistory} />

        <Stack.Screen name="TestScreen" component={TestScreen} />

        <Stack.Screen name="ApplyLeave" component={ApplyLeave} />
        <Stack.Screen name="Outstation" component={Outstation} />
        <Stack.Screen
          name="AttendenceNotMarked"
          component={AttendenceNotMarked}
        />
        <Stack.Screen name="LateArivel" component={LateArivel} />

        <Stack.Screen name="EarlyLeaving" component={EarlyLeaving} />
        <Stack.Screen name="ToilLeave" component={ToilLeave} />

        {/* <Stack.Screen name="ApplicationType" component={BottomTabApplication} />
        <Stack.Screen name="ApplyLeave" component={ApplyLeave} />
        <Stack.Screen name="Outstation" component={Outstation} />
        <Stack.Screen name="AttendenceMarked" component={AttendenceMarked} />
        <Stack.Screen name="LateArivel" component={LateArivel} />
        <Stack.Screen name="EarliLeaving" component={EarliLeaving} />
        <Stack.Screen name="ToilLeave" component={ToilLeave} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Wfh" component={Wfh} />
        <Stack.Screen name="Financial" component={Financial} />
        <Stack.Screen name="TimeLine" component={TimeLine} />
        <Stack.Screen name="ChildBss" component={ChildBss} />
        <Stack.Screen name="FeedBack" component={FeedBack} />
        <Stack.Screen name="WorkFromHome" component={WorkFromHome} />
        <Stack.Screen name="LeaveBalance" component={LeaveBalance} />
        <Stack.Screen name="LeaveHistory" component={LeaveHistory} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="ScannerDetail" component={ScannerDetail} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="MovementLine" component={MovementLine} />
        <Stack.Screen name="ViewAllMessages" component={ViewAllMessages} />
        <Stack.Screen name="ViewMessageDetail" component={ViewMessageDetail} /> */}

        {/* <Stack.Screen name="Scanner" component={Scanner} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
