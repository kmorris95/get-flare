import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import LoginSignUp from './src/components/login/login-signup'

export default class Flare extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content"/>
        <LoginSignUp/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Flare', () => Flare);
