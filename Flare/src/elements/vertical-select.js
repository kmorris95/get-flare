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

let list;

class VerticalSelect extends Component {
    constructor(props) {
        super(props);
        this.initialize(props.list);
        this.state = {
          name: '',
          list: props.list
        }
    }

    initialize(list) {
      for (var i = 0; i < list.length; i++) {
        list[i].active = false;
      }
    }

    chooseStyle(element) {
      let newList = this.state.list;
      this.setState({name: element.name});
      for (var i = 0; i < newList.length; i++) {
        if (newList[i].name === element.name) {
          newList[i].active = true;
        } else {
          newList[i].active = false;
        }
      }
      this.setState({list: newList})
    }

    render() {
      let elements = this.state.list.map((element) => {
        return (
          <TouchableHighlight
            style={[styles.option, element.active ? styles.gray : styles.white]}
            onPress={this.chooseStyle.bind(this, element)}
            underlayColor={colors.lightgray}
            key={element.name}
          >
            <Text>
              {element.name}
            </Text>
          </TouchableHighlight>
        )
      })

      return(
          <ScrollView style={[styles.container, {maxHeight: this.props.maxHeight}]}>
            {elements}
          </ScrollView>
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

export default VerticalSelect;
