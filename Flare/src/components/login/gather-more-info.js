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
import { zipCodeRegex } from '../../constants/regex';
import { database } from '../../database';

class GatherMoreInfo extends Component {

  constructor(props) {
    super(props);
    this.shop = {
      name: '',
      address: '',
      state: '',
      city: '',
      zipCode: '',
      compareName: '',
      employees: []
    };
    this.state = {
      validShopName: true,
      validShopAddress: true,
      validShopState: true,
      validShopCity: true,
      validShopZipCode: true
    };
  }

  navigateForward(routeName) {
    this.props.navigator.push({
        name: routeName,
        email: this.props.email
    });
  }

  navigateBack() {
    this.props.navigator.pop();
  }

  checkForBlanks() {
    let valid = true;
    let message = '';
    if (this.shop.name === '') {
      valid = false;
      this.setState({validShopName: false});
      message += '- Shop name field is blank.\n'
    } else {
      this.setState({validShopName: true});
    }
    if (this.shop.address === '') {
      valid = false;
      this.setState({validShopAddress: false});
      message += '- Shop address field is blank.\n'
    } else {
      this.setState({validShopAddress: true});
    }
    if (this.shop.state === '') {
      valid = false;
      this.setState({validShopState: false});
      message += '- Shop state field is blank.\n'
    } else {
      this.setState({validShopState: true});
    }
    if (this.shop.city === '') {
      valid = false;
      this.setState({validShopCity: false});
      message += '- Shop city field is blank.\n'
    } else {
      this.setState({validShopCity: true});
    }
    if (this.shop.zipCode === '') {
      valid = false;
      this.setState({validShopZipCode: false});
      message += '- Shop zip code field is blank.\n'
    } else {
      this.setState({validShopZipCode: true});
    }
    if (!valid) {
      Alert.alert('Invalid input', message);
    }
    return valid;
  }

  checkZipCode() {
    let valid = true;
    let message = '';

    if (!zipCodeRegex.test(this.shop.zipCode)) {
      valid = false;
      this.setState({validShopZipCode: false});
      message += '- Invalid zip code (must be five digits).\n'
    } else {
      this.setState({validShopZipCode: true});
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
      valid = this.checkZipCode();
      if (valid) {
        this.shop.compareName = this.shop.name.toUpperCase().replace(/\s/g, "");
        database.write(() => {
          let user = database.objects('User').filtered('email = "' + this.props.email + '"');
          user = user[0];
          user.shopName = this.shop.name;

          let dbShop = database.objects('Shop').filtered('compareName = "' + this.shop.compareName + '"');
          dbShop = dbShop[0];
          if (dbShop === undefined) {
            this.shop.employees.push(user);
            database.create('Shop', this.shop);
          } else {
            dbShop.employees.push(user);
          }
        })
        Alert.alert('Sign Up Successful');
        this.navigateForward('Main');
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
            Tell us more about your shop...
          </Text>
          <View style={styles.formContainer}>
              <TextInput
                style={this.state.validShopName ? styles.input : [styles.input, styles.warning]}
                placeholder="Shop Name"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.shop.name = text.trim()}
                onSubmitEditing={() => this.shopAddress.focus()}
              />
              <TextInput
                style={this.state.validShopAddress ? styles.input : [styles.input, styles.warning]}
                placeholder="Address"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.shop.address = text.trim()}
                onSubmitEditing={() => this.shopState.focus()}
                ref={(input) => this.shopAddress = input}
              />
              <TextInput
                style={this.state.validShopState ? styles.input : [styles.input, styles.warning]}
                placeholder="State"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.shop.state = text.trim()}
                onSubmitEditing={() => this.shopCity.focus()}
                ref={(input) => this.shopState = input}
              />
              <TextInput
                style={this.state.validShopCity ? styles.input : [styles.input, styles.warning]}
                placeholder="City"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text) => this.shop.city = text.trim()}
                onSubmitEditing={() => this.shopZipCode.focus()}
                ref={(input) => this.shopCity = input}
              />
              <TextInput
                style={this.state.validShopZipCode ? styles.input : [styles.input, styles.warning]}
                placeholder="Zip Code"
                returnKeyType="done"
                autoCorrect={false}
                keyboardType={'number-pad'}
                onChangeText={(text) => this.shop.zipCode = text.trim()}
                ref={(input) => this.shopZipCode = input}
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
    height: 240,
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
    fontSize: 20,
    color: colors.magenta,
    fontWeight: '500'
  },
  warning: {
    backgroundColor: colors.yellow,
    borderColor: 'red'
  }
});

export default GatherMoreInfo;
