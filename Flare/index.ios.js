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
import SignUpForm from './src/components/login/signup-form';

export default class Flare extends Component {
  render() {
    return (
        <Navigator
          initialRoute={{name: 'LoginSignUp'}}
          renderScene={this.renderScene.bind(this)}
        />
    );
  }

  renderScene(route, navigator) {
      switch(route.name) {
          case 'LoginSignUp':
            return <LoginSignUp navigator={navigator} />;
          case 'LogIn':
            return <LogIn navigator={navigator} />;
          case 'SignUp':
            return <SignUp navigator={navigator} />;
          case 'SignUpForm':
            return <SignUpForm navigator={navigator} />;
      }
  }
}

AppRegistry.registerComponent('Flare', () => Flare);
