import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { colors } from '../constants/flare-constants';

class Share extends Component{

  navigateForward(routeName, email) {
    this.props.navigator.push({
        name: routeName,
        email: email
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.info}
          onPress={this.navigateForward.bind(this, 'Profile', this.props.info.email)}
          activeOpacity={0.5}
        >
          <Text style={styles.name}>
            {this.props.info.firstName + " " + this.props.info.lastName}
          </Text>
          <Text style={styles.shop}>
            {this.props.info.shopName}
          </Text>
        </TouchableOpacity>
        <View style={styles.placeholder}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: 305
  },
  info: {
    marginLeft: 15,
    marginTop: 10
  },
  name: {
    color: colors.teal,
    fontSize: 17,
    fontWeight: '600'
  },
  shop: {
    color: colors.gray,
    fontSize: 12
  },
  placeholder: {
    backgroundColor: 'black',
    marginTop: 5,
    marginHorizontal: 10,
    height: 250
  }
});
export default Share;
