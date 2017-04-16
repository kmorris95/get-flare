'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Alert,
    Text
} from 'react-native';

import { colors } from '../constants/flare-constants';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false
        }
    }

    chosen() {
      if (!this.state.active) {
        this.setState({active: true});
      } else {
        this.setState({active: false});
      }
      //return this.props.item.text;
    }

    render() {
        return(
            <TouchableHighlight
              style={[styles.container, this.state.active ? styles.active : styles.notActive]}
              onPress={this.chosen.bind(this)}
              underlayColor={colors.teal}
            >
              <Text style={styles.text}>{this.props.item.text}</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      height: 40,
      width: 72,
      justifyContent: 'center',
      alignItems: 'center'
    },
    active: {
      backgroundColor: colors.teal
    },
    notActive: {
      backgroundColor: colors.white
    }
});

export default Schedule;
