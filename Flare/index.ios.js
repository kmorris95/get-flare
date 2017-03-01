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
import Main from './src/components/main/main';
import Appointments from './src/components/main/appointments';
import Payment from './src/components/main/payment';
import Profile from './src/components/main/profile';
import Settings from './src/components/main/settings';

export default class Flare extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'GatherMoreInfo'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'LogInSignUp':
        return <LoginSignUp navigator={navigator} />;
      case 'LogIn':
        return <LogIn navigator={navigator} />;
      case 'SignUp':
        return <SignUp navigator={navigator} />;
      case 'GatherMoreInfo':
        return <GatherMoreInfo navigator={navigator} />;
      case 'Main':
        return <Main navigator={navigator} />;
      case 'Payment':
        return <Payment navigator={navigator} />;
      case 'Appointments':
        return <Appointments navigator={navigator} />;
      case 'Profile':
        return <Profile navigator={navigator} />;
      case 'Settings':
        return <Settings navigator={navigator} />;
    }
  }
}

AppRegistry.registerComponent('Flare', () => Flare);
