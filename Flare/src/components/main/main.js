'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  StatusBar,
  Text
} from 'react-native';

import { colors } from '../../constants/flare-constants';
import DropDown from '../../elements/drop-down';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: 'inactive'
    }
  }

  renderMenuToggle() {
    if (this.state.menu === 'inactive') {
      return (<Text
        style={styles.dropDownButton}
        onPress={this.dropMenu.bind(this)}
      >
        &#60;
      </Text>);
    } else {
      return (<Text
        style={styles.dropDownButton}
        onPress={this.raiseMenu.bind(this)}
      >
        &#62;
      </Text>);
    }
  }

  dropMenu = () => {
    this.dropDown.show();
    this.setState({menu: 'active'});
  }

  raiseMenu = () => {
    this.dropDown.hide();
    this.setState({menu: 'inactive'});
  }

  navigateForward(routeName) {
    this.props.navigator.push({
        name: routeName
    });
  }

  navigateBack() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.dropDownBar}>
            {this.renderMenuToggle()}
        </View>
        <DropDown
          navigator={this.props.navigator}
          ref={(dropDown) => this.dropDown = dropDown}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  dropDownBar: {
    backgroundColor: 'lightgray',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropDownButton: {
    marginTop: 20,
    transform: [{ rotate: '-90deg'}],
    color: colors.magenta,
    fontWeight: '700',
    fontSize: 25
  }
});

export default Main;
