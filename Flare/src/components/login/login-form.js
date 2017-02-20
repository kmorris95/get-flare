'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';

import { colors } from '../../constants/flare-constants';
import { database } from '../../database';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.loginInfo = {
      email: '',
      password: ''
    };
  }

  navigateForward(routeName) {
    this.props.navigator.push({
        name: routeName
    });
  }

  navigateBack() {
    this.props.navigator.pop();
  }

  submitForm() {
    let users = database.objects('User');
    let query = 'email = "' + this.loginInfo.email.trim() + '" AND password = "'
      + this.loginInfo.password + '"'
    let result = users.filtered(query)[0];
    if (result ===  undefined) {
      Alert.alert("Authentication failed", "Please try again.")
    } else {
      this.navigateForward('Main');
      Alert.alert("DB", "" + result.firstName);
    }
  }

  render() {
      return(
          <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => this.loginInfo.email = text}
                onSubmitEditing={() => this.password.focus()}
                ref={(input) => this.email = input}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => this.loginInfo.password = text}
                ref={(input) => this.password = input}
              />
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.9}
                onPress={this.submitForm.bind(this)}>
                  <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgot}
                activeOpacity={0.9}
              >
                  <Text style={styles.forgotText}>Forgot Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.facebook}
                activeOpacity={0.9}>
                  <Text style={styles.facebookText}>Facebook</Text>
              </TouchableOpacity>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 380,
    marginTop: 20,
  },
  input: {
    height: 35,
    backgroundColor: 'white',
    borderColor: colors.magenta,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
    marginBottom: 10
  },
  login: {
    backgroundColor: colors.teal,
    height: 35,
    borderRadius: 8,
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
    marginTop: 7,
    fontWeight: '100'
  },
  forgot: {
    marginTop: 10,
    alignItems: 'center'
  },
  forgotText: {
    color: colors.magenta,
    fontWeight: '100',
    fontSize: 11,
    textDecorationLine: 'underline'
  },
  facebook: {
    marginTop: 40,
    height: 35,
    borderRadius: 8,
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  facebookText: {
    color: 'white',
    marginTop: 7,
    fontWeight: 'bold',
    fontSize: 11
  }
});

export default LoginForm;
