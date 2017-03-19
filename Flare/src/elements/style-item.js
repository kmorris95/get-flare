import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { colors } from '../constants/flare-constants'

class StyleItem extends Component{

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.price}>
          <Text style={styles.priceText}>
            {this.props.item.price}
          </Text>
        </View>
        <View style={styles.theRest}>
          <Text>
            {this.props.item.name}
          </Text>
          <Text style={{textAlign: 'center'}}>
            {this.props.item.duration}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  price: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  priceText: {
    color: colors.teal,
    fontWeight: '600',
  },
  theRest: {
    justifyContent: 'center',
    marginLeft: 100
  }
});
export default StyleItem;
