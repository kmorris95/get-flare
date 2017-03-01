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

import { colors } from '../../constants/flare-constants';
import { database } from '../../database';

class GatherMoreInfo extends Component {

  constructor(props) {
    super(props);
    this.profile = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      service: ''
    };
    this.state = {
      validFirstName: true,
      validLastName: true,
      validPhoneNumber: true,
      validEmail: true,
      validPassword: true,
      validConfirmPassword: true
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
  
  checkForUniqueEmail() {
    let existingEmail = database.objects('User').filtered('email = "' + this.profile.email + '"');
    if (existingEmail.length !== 0) {
      Alert.alert("Invalid Email", "The provided email is already in use.")
      this.setState({validEmail: false})
      return false;
    }
    this.setState({validEmail: true})
    return true;
  }

  checkForBlanks() {
    let valid = true;
    let message = '';
    if (this.profile.firstName === '') {
      valid = false;
      this.setState({validFirstName: false});
      message += '- First name field is blank.\n'
    } else {
      this.setState({validFirstName: true});
    }
    if (this.profile.lastName === '') {
      valid = false;
      this.setState({validLastName: false});
      message += '- Last name field is blank.\n'
    } else {
     this.setState({validLastName: true});
    }
    if (this.profile.phone === '') {
      valid = false;
      this.setState({validPhoneNumber: false});
      message += '- Phone number field is blank.\n'
    } else {
      this.setState({validPhoneNumber: true});
    }
    if (this.profile.email === '') {
      valid = false;
      this.setState({validEmail: false});
      message += '- Email field is blank.\n'
    } else {
      this.setState({validEmail: true});
    }
    if (this.profile.password === '') {
      valid = false;
      this.setState({validPassword: false});
      message += '- Password field is blank.\n'
    } else {
      this.setState({validPassword: true});
    }
    if (this.profile.confirmPassword === '') {
      valid = false;
      this.setState({validConfirmPassword: false});
      message += '- Confirm password field is blank.\n'
    } else {
      this.setState({validConfirmPassword: true});
    }
    if (!valid) {
      Alert.alert('Invalid input', message);
    }
    return valid;
  }

  checkForm() {
    let valid = true;
    let message = '';

    if (!phoneNumberRegex.test(this.profile.phone)) {
      valid = false;
      this.setState({validPhoneNumber: false});
      message += '- Phone number must be 10-11 digits.\n'
    } else {
      this.setState({validPhoneNumber: true});
    }
    if (!emailRegex.test(this.profile.email)) {
      valid = false;
      this.setState({validEmail: false});
      message += '- Email must be email@domain.(com, edu, etc.)\n'
    } else {
     this.setState({validEmail: true});
    }
    if (!passwordRegex.test(this.profile.password)) {
      valid = false;
      this.setState({validPassword: false});
      message += '- Password must be at least 6 characters and contain a letter and number.\n';
    } else {
      this.setState({validPassword: true});
    }
    if (this.profile.confirmPassword !== this.profile.password) {
      valid = false;
      this.setState({validConfirmPassword: false});
      message += '- Passwords do not match.\n';
    } else {
      this.setState({validConfirmPassword: true});
    }
    if (!valid) {
      Alert.alert('Invalid input', message);
    }
    return valid;
  }

  submitForm() {
    let valid = true;
    valid = this.checkForBlanks();
    if (valid) {
      valid = this.checkForm();
      if (valid) {
        valid = this.checkForUniqueEmail();
        if (valid) {
          this.profile.service = this.service.whichService();
          database.write(() => {
            database.create('User', this.profile);
          })
          Alert.alert('Sign Up Successful');
          this.navigateForward('LogIn');
        }
      }
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
          <Text style={styles.header}>
            Tell us more about you...
          </Text>
          <View style={styles.formContainer}>
              <TextInput
                style={this.state.validShopName ? styles.input : [styles.input, styles.warning]}
                placeholder="Shop Name"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.profile.firstName = text.trim()}
                onSubmitEditing={() => this.lastName.focus()}
                ref={(input) => this.firstName = input}
              />
              <TextInput
                style={this.state.validLastName ? styles.input : [styles.input, styles.warning]}
                placeholder="Last Name"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.profile.lastName = text.trim()}
                onSubmitEditing={() => this.phoneNumber.focus()}
                ref={(input) => this.lastName = input}
              />
              <TextInput
                style={this.state.validPhoneNumber ? styles.input : [styles.input, styles.warning]}
                placeholder="Phone Number"
                returnKeyType="next"
                keyboardType="phone-pad"
                onChangeText={(text) => this.profile.phone = text.trim()}
                onSubmitEditing={() => this.email.focus()}
                ref={(input) => this.phoneNumber = input}
              />
              <TextInput
                style={this.state.validEmail ? styles.input : [styles.input, styles.warning]}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => this.profile.email = text.toLowerCase().trim()}
                onSubmitEditing={() => this.password.focus()}
                ref={(input) => this.email = input}
              />
              <TextInput
                style={this.state.validPassword ? styles.input : [styles.input, styles.warning]}
                placeholder="Password (min. 6 characters)"
                secureTextEntry={true}
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => this.profile.password = text.trim()}
                onSubmitEditing={() => this.confirmPassword.focus()}
                ref={(input) => this.password = input}
              />
              <TextInput
                style={this.state.validConfirmPassword ? styles.input : [styles.input, styles.warning]}
                placeholder="Re-enter password"
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={(text) => this.profile.confirmPassword = text.trim()}
                ref={(input) => this.confirmPassword = input}
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
    height: 330,
    justifyContent: 'center',
    marginLeft: 45
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
  header: {
    marginTop: 60,
    marginLeft: 45,
    fontSize: 25,
    color: colors.magenta,
    fontWeight: '500'
  },
  warning: {
    backgroundColor: colors.yellow,
    borderColor: 'red'
  }
});

export default GatherMoreInfo;
