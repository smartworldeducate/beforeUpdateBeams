import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileCardBody from './ProfileCardBody';
import {useDispatch, useSelector} from 'react-redux';

const ReporteeProfileCard = ({
  empId,
  empFatherName,
  empGender,
  empReligion,
  empDOB,
  empCNIC,
  empCadre,
  empDesignation,
  empDepartment,
  empBranch,
  empStatus,
  empReportingTo,
  empHireDate,
  empRegularDate,
  empConfirmationDate,
  empServiceLength,
  empBasicSalary,
  empGrossSalary,
  empAllowance,
  empTakeHomeSalary,
  empCostToSchool,
  empAccounTitle,
  empEOBI,
  empMobilePrimary,
  empMobileSecondary,
  empEmail,
  empAddress,
  onPressMovementLog,
  onPressChildInBSS,
}) => {
  const [expanded, setExpended] = useState(false);
  const onPress = ({item}) => {
    console.log('itemExp', item);
  };

  const reporteeProfileHere = useSelector(state => state.reporteeProfileStore);

  return (
    <View style={{}}>
      <View style={{marginTop: hp(1.5)}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#EAFAF1',
            borderRadius: hp(1.5),
            elevation: 4,
          }}>
          <View>
            <Collapse isExpanded={expanded} onToggle={() => onPress(1)}>
              <CollapseHeader>
                <ProfileCardHeader
                  userIcon={'user'}
                  headerText={'Personal Information'}
                />
              </CollapseHeader>
              <CollapseBody>
                <ProfileCardBody leftText={'Employee ID'} rightText={empId} />
                <ProfileCardBody
                  leftText={"Father's Name"}
                  rightText={empFatherName}
                />
                <ProfileCardBody leftText={'Gender'} rightText={empGender} />
                <ProfileCardBody
                  leftText={'Religion'}
                  rightText={empReligion}
                />
                <ProfileCardBody
                  leftText={'Date of Birth'}
                  rightText={empDOB}
                />
                <ProfileCardBody leftText={'CNIC'} rightText={empCNIC} />
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </View>

      <View style={{marginTop: hp(1.5)}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#EAFAF1',
            borderRadius: hp(1.5),
            elevation: 4,
          }}>
          <View>
            <Collapse isExpanded={expanded} onToggle={() => onPress(1)}>
              <CollapseHeader>
                <ProfileCardHeader
                  userIcon={'user-gear'}
                  headerText={'Service Information'}
                />
              </CollapseHeader>
              <CollapseBody>
                <ProfileCardBody leftText={'Cadre'} rightText={empCadre} />
                <ProfileCardBody
                  leftText={'Designation'}
                  rightText={empDesignation}
                />
                <ProfileCardBody
                  leftText={'Department'}
                  rightText={empDepartment}
                />
                <ProfileCardBody leftText={'Branch'} rightText={empBranch} />
                <ProfileCardBody
                  leftText={'Employeement Status'}
                  rightText={empStatus}
                />
                <ProfileCardBody
                  leftText={'Reporting To'}
                  rightText={empReportingTo}
                />
                <ProfileCardBody
                  leftText={'Hire Date'}
                  rightText={empHireDate}
                />
                <ProfileCardBody
                  leftText={'Regular Date'}
                  rightText={empRegularDate}
                />
                <ProfileCardBody
                  leftText={'Confirmation Date'}
                  rightText={empConfirmationDate}
                />
                <ProfileCardBody
                  leftText={'Service Length'}
                  rightText={empServiceLength}
                />
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </View>

      <View style={{marginTop: hp(1.5)}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#EAFAF1',
            borderRadius: hp(1.5),
            elevation: 4,
          }}>
          <View>
            <Collapse isExpanded={expanded} onToggle={() => onPress(1)}>
              <CollapseHeader>
                <ProfileCardHeader
                  userIcon={'money-bill-1-wave'}
                  headerText={'Financial Information'}
                />
              </CollapseHeader>
              <CollapseBody>
                <ProfileCardBody
                  leftText={'Basic Salary'}
                  rightText={empBasicSalary}
                />
                <ProfileCardBody
                  leftText={'Gross Salary'}
                  rightText={empGrossSalary}
                />
                <ProfileCardBody
                  leftText={'Allowance'}
                  rightText={empAllowance}
                />

                <ProfileCardBody
                  leftText={'Take Home'}
                  rightText={empTakeHomeSalary}
                />
                <ProfileCardBody
                  leftText={'Cost To School'}
                  rightText={empCostToSchool}
                />
                <ProfileCardBody
                  leftText={'Account Title'}
                  rightText={empAccounTitle}
                />
                <ProfileCardBody leftText={'EOBI'} rightText={empEOBI} />
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </View>

      <View style={{marginTop: hp(1.5)}}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#EAFAF1',
            borderRadius: hp(1.5),
            elevation: 4,
          }}>
          <View>
            <Collapse isExpanded={expanded} onToggle={() => onPress(1)}>
              <CollapseHeader>
                <ProfileCardHeader
                  userIcon={'phone'}
                  headerText={'Contact Information'}
                />
              </CollapseHeader>
              <CollapseBody>
                <ProfileCardBody
                  leftText={'Mobile (Primary)'}
                  rightText={empMobilePrimary}
                />
                <ProfileCardBody
                  leftText={'Mobile (Secondary)'}
                  rightText={empMobileSecondary}
                />
                <ProfileCardBody leftText={'Email'} rightText={empEmail} />
                <ProfileCardBody leftText={'Address'} rightText={empAddress} />
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: hp(1.5),
          marginBottom:
            reporteeProfileHere?.userData?.emp_result?.MARITAL_STATUS == 'M'
              ? hp('0')
              : hp('1.5'),
        }}>
        <TouchableOpacity
          onPress={onPressMovementLog}
          style={{
            justifyContent: 'center',
            backgroundColor: '#EAFAF1',
            borderRadius: hp(1.5),
            elevation: 4,
          }}>
          <ProfileCardHeader
            userIcon={'clipboard-check'}
            headerText={'Movement Log'}
          />
        </TouchableOpacity>
      </View>

      {reporteeProfileHere?.userData?.emp_result?.MARITAL_STATUS == 'M' && (
        <View style={{marginTop: hp(1.5), marginBottom: hp('1.5')}}>
          <TouchableOpacity
            onPress={onPressChildInBSS}
            style={{
              justifyContent: 'center',
              backgroundColor: '#EAFAF1',
              borderRadius: hp(1.5),
              elevation: 4,
            }}>
            <ProfileCardHeader
              userIcon={'child'}
              headerText={'Children In Beaconhouse'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  header: {
    fontSize: '0.62rem',
    fontFamily: fontFamily.ceraBold,
    color: '#363636',
    fontWeight: '700',
  },
});

export default ReporteeProfileCard;
