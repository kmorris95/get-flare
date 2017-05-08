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

class HorizontalSelect extends Component {
    constructor(props) {
        super(props);
        list = this.initialize(props.list);
        this.state = {
          chosen: '',
          list: list
        }
    }

    initialize(list) {
      let initializedList = [];
      for (var i = 0; i < list.length; i++) {
        var element = {};
        element.content = list[i];
        element.active = false;
        initializedList.push(element);
      }
      return initializedList;
    }

    chooseStyle(element) {
      let newList = this.state.list;
      this.setState({chosen: element.content});
      for (var i = 0; i < newList.length; i++) {
        if (newList[i].content === element.content) {
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
            key={element.content}
          >
            <Text>
              {element.content}
            </Text>
          </TouchableHighlight>
        )
      })

      return(
          <ScrollView style={[styles.container, {maxHeight: this.props.maxHeight}]} horizontal={true}>
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

export default HorizontalSelect;
