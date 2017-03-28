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
      return this.props.item.text;
    }

    render() {
        return(
            <View
              style={[styles.container, this.props.item.active ? styles.active : styles.notActive]}
            >
              <Text style={styles.text}>{this.props.item.text}</Text>
            </View>
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
