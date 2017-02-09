import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoginSignUp from './src/components/login/login-signup'

export default class Flare extends Component {
  render() {
    return (
      <View>
        <LoginSignUp/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Flare', () => Flare);
