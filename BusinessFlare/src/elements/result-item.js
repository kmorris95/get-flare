'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    Alert,
    Text
} from 'react-native';

import { colors } from '../constants/flare-constants';

let item;

class ResultItem extends Component {
    constructor(props) {
        super(props);
        if (props.item !== null) {
          console.log(props);
          // if (props.item.name) {
          //   console.log(props.item);
          // }
        }
    }

    render() {
      return(
          <Text>
          </Text>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  option: {
    height: 35,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightgray
  },
  gray: {
    backgroundColor: colors.lightgray,
    borderColor: 'black'
  },
  white: {
    backgroundColor: 'white'
  }
});

export default ResultItem;
