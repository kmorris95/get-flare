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
      shopName: '',
      shopAddress: ''
    };
    this.state = {
      validShopName: true,
      validShopAddress: true
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
    if (this.profile.shopName === '') {
      valid = false;
      this.setState({validShopName: false});
      message += '- Shop name field is blank.\n'
    } else {
      this.setState({validShopName: true});
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
                onChangeText={(text) => this.profile.shopName = text.trim()}
                onSubmitEditing={() => this.shopAddress.focus()}
              />
              <TextInput
                style={this.state.validShopAddress ? styles.input : [styles.input, styles.warning]}
                placeholder="Shop Address"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.profile.shopAddress = text.trim()}
              />
          </View>
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
