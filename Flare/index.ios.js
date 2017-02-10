import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import LoginSignUp from './src/components/login/login-signup';
import Login from './src/components/login/login';

export default class Flare extends Component {
  render() {
    return (
        <Login/>
    );
  }
}

AppRegistry.registerComponent('Flare', () => Flare);
