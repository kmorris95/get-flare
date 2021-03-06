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
import Main from './src/components/main/main';
import Appointments from './src/components/main/appointments';
import Payment from './src/components/main/payment';
import Profile from './src/components/main/profile';
import EditProfile from './src/components/main/editProfile';
import Settings from './src/components/main/settings';
import Results from './src/components/main/results';

export default class Flare extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Main'}}
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
        return <GatherMoreInfo navigator={navigator} email={route.email}/>;
      case 'Main':
        return <Main navigator={navigator} email={route.email}/>;
      case 'Payment':
        return <Payment navigator={navigator} email={route.email}/>;
      case 'Appointments':
        return <Appointments navigator={navigator} email={route.email}/>;
      case 'Profile':
        return <Profile navigator={navigator} email={route.email}/>;
      case 'EditProfile':
        return <EditProfile navigator={navigator} email={route.email}/>;
      case 'Settings':
        return <Settings navigator={navigator} email={route.email}/>;
      case 'Results':
        return <Results navigator={navigator} email={route.email} coords={route.coords}/>;
    }
  }
}

AppRegistry.registerComponent('Flare', () => Flare);
