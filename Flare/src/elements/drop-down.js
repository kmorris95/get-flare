import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet
} from 'react-native';

import { dropDownOptions, colors } from '../constants/flare-constants';

class DropDown extends Component{
  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.Value(0)
    }
  }

  navigateForward(routeName) {
    this.props.navigator.push({
        name: routeName
    });
  }

  hide() {
    Animated.timing(
      this.state.position,
      {
        toValue: 0,
        duration: 1500
      }
    ).start()
  }

  show() {
    Animated.timing(
      this.state.position,
      {
        toValue: 360,
        duration: 1500
      }
    ).start()
  }

  render() {
    return(
      <Animated.View
        style={[styles.container, {transform: [{translateY: this.state.position}]}]}
      >
        <View style={styles.info}>
          <View style={styles.placeholder}></View>
          <Text>
            User Name
          </Text>
        </View>
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.9}
          >
            <Text style={styles.optionText}>
              {dropDownOptions[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.9}
          >
            <Text style={styles.optionText}>
              {dropDownOptions[1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.9}
          >
            <Text style={styles.optionText}>
              {dropDownOptions[2]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.9}
            onPress={this.navigateForward.bind(this, 'LogInSignUp')}
          >
            <Text style={styles.optionText}>
              {dropDownOptions[3]}
            </Text>
          </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 305,
    width: 255,
    left: 60,
    top: -310,
    position: 'absolute'
  },
  placeholder: {
    height: 75,
    width: 75,
    marginBottom: 15,
    backgroundColor: colors.magenta
  },
  info: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  option: {
    marginTop: 3,
    height: 35,
    backgroundColor: colors.magenta,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionText: {
    color: 'white'
  }
});
export default DropDown;
