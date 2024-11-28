const userName = 'Beams';
const lastName = 'App';

const details = userName + ' ' + lastName;

export const adress = 'lahore';

export {userName, lastName};
export default details;

const empDetails = {
  name: 'ali',
  gender: 'male',
  age: 50,
};

const {name, gender} = empDetails;
export {name, gender};

const userDetails = {
  userNameHere: 'umair',
  userGenderHere: 'male',
  userAgeHere: 30,
};

const {userNameHere: myName, userGenderHere: myGender} = userDetails;

export {myName, myGender};

const stdDetails = {
  stdName: 'Rehan',
  stdGender: 'male',
  stdAge: 30,
};

const {stdName, stdGender, stdAge, stdCountry = 'Pakistan'} = stdDetails;
export {stdName, stdGender, stdAge, stdCountry};

const fruits = ['Bananas', 'Oranges', 'Apples', 'Mangos'];

const [fruit1, fruit2] = fruits;
export {fruit1, fruit2};

const fruitsHere = ['Bananas', 'Oranges', 'Apples', 'Mangos'];

const {[0]: fruitIndexOne, [3]: fruitIndexThree} = fruitsHere;

export {fruitIndexOne, fruitIndexThree};
