'use strict';

import {
    Dimensions
} from 'react-native';

export const colors = {
    magenta: '#A61948',
    teal: '#44749D',
    lightgray: '#EAEAEA',
    gray: '#9E9E9E'
};

export const dimensions = {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height
};

export const dropDownOptions = [
  'Profile',
  'Appointments',
  'Payment',
  'Log out'
];
