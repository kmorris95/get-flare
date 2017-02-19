'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';

import LoginForm from './login-form'
import { colors } from '../../constants/flare-constants';
import ToggleSwitch from '../../elements/toggle-switch';
import Database from '../../database';

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.confirmPassword = '';
    this.profile = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      service: ''
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
    if (this.profile.password !== this.confirmPassword) {
      Alert.alert("Password mismatch", "The passwords do not match");
    } else {
      this.profile.service = this.service.whichService();
    }
  }

  render() {
    return(
      <View style={styles.container}>
          <View style={styles.navigation}>
              <TouchableOpacity
                onPress={this.navigateBack.bind(this)}
              >
                  <Text style={styles.back}>&#60;</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.submitForm.bind(this)}
              >
                  <Text style={styles.signUp}>Sign Up</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                returnKeyType="next"
                onChangeText={(text) => this.profile.firstName = text}
                onSubmitEditing={() => this.lastName.focus()}
                ref={(input) => this.firstName = input}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                returnKeyType="next"
                onChangeText={(text) => this.profile.lastName = text}
                onSubmitEditing={() => this.phoneNumber.focus()}
                ref={(input) => this.lastName = input}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                returnKeyType="next"
                keyboardType="phone-pad"
                onChangeText={(text) => this.profile.phone = text}
                onSubmitEditing={() => this.email.focus()}
                ref={(input) => this.phoneNumber = input}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={(text) => this.profile.email = text}
                onSubmitEditing={() => this.password.focus()}
                ref={(input) => this.email = input}
              />
              <TextInput
                style={styles.input}
                placeholder="Password (min. 6 characters)"
                secureTextEntry={true}
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={(text) => this.profile.password = text}
                onSubmitEditing={() => this.confirmPassword.focus()}
                ref={(input) => this.password = input}
              />
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={(text) => this.confirmPassword = text}
                ref={(input) => this.confirmPassword = input}
              />
              <Text style={styles.text}>
                  Choose your service:
              </Text>
              <ToggleSwitch
                left="Barber"
                right="Stylist"
                ref={(service) => this.service = service}
              />
          </View>

          <Text style={styles.terms}>Terms of Service</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 20
  },
  formContainer: {
    width: 280,
    height: 380,
    justifyContent: 'center',
    marginLeft: 45,
    marginTop: 100
  },
  terms: {
    color: colors.magenta,
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: 145,
    fontSize: 10,
    fontWeight: '500'
  },
  back: {
    color: colors.magenta,
    fontWeight: '900',
    fontSize: 17
  },
  input: {
    height: 35,
    backgroundColor: 'white',
    borderColor: colors.teal,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
    marginBottom: 5
  },
  signUp: {
    color: colors.magenta,
    fontWeight: '200',
    marginLeft: 290,
    marginTop: 2
  },
  text: {
    marginTop: 3,
    marginBottom: 5,
    color: '#A5A5A5',
    fontWeight: '500'
  }
});

export default SignUpForm;
