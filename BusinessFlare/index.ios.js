import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';

import LoginSignUp from './src/components/login/login-signup';
import LogIn from './src/components/login/login';
import SignUp from './src/components/login/signup';

export default class BusinessFlare extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'LogInSignUp'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'LogInSignUp':
        return <LoginSignUp navigator={navigator}/>;
      case 'LogIn':
        return <LogIn navigator={navigator}/>;
      case 'SignUp':
        return <SignUp navigator={navigator}/>;
    }
  }
}

AppRegistry.registerComponent('BusinessFlare', () => BusinessFlare);
