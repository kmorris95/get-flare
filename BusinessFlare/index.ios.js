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
import GatherMoreInfo from './src/components/login/gather-more-info';

export default class BusinessFlare extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'SignUp'}}
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
      case 'GatherMoreInfo':
        return <GatherMoreInfo navigator={navigator} user={route.user}/>;
    }
  }
}

AppRegistry.registerComponent('BusinessFlare', () => BusinessFlare);
