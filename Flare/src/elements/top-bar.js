import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { colors } from '../constants/flare-constants';

class TopBar extends Component{

  navigateBack() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.navigateBack.bind(this)}
        >
          <Text style={styles.back}>
            &#60;
          </Text>
        </TouchableOpacity>
        <Text style={styles.pageHeader}>
          {this.props.text}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    height: 50,
    flexDirection: 'row',
  },
  back: {
    marginLeft: 10,
    marginTop: 21,
    color: colors.magenta,
    fontWeight: '900',
    fontSize: 20
  },
  pageHeader: {
    marginHorizontal: 139,
    marginTop: 23,
    width: 200,
    color: colors.teal,
    fontSize: 17,
    fontWeight: '500'
  }
});
export default TopBar;
