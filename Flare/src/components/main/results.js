import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  PickerIOS,
  TouchableOpacity
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

import { database } from '../../database';
import TopBar from '../../elements/top-bar';
import VerticalSelect from '../../elements/vertical-select';
import HorizontalSelect from '../../elements/horizontal-select';
import StyleItem from '../../elements/style-item';
import { colors } from '../../constants/flare-constants';
import { googleMapsKey } from '../../constants/api-keys';
import { hairstyles } from '../../staticData/hairstyles';
import Schedule from '../../elements/schedule';
var moment = require('moment');

let shops;
let resultList;
let coords;

class Results extends Component{
  constructor(props) {
    super(props);
    shops = database.objects('Shop');
    coords = props.coords;
    resultList = this.getResults();
  }

  extractNumberFromDistance(distance) {
    let length = distance.length;
    distance  = distance.substring(0, length-2);
    distance = parseFloat(distance);
    return distance;
  }

  sortListByDistance(list) {
    list.sort((a, b) => {
      let distanceA = this.extractNumberFromDistance(a.distance);
      let distanceB = this.extractNumberFromDistance(b.distance);

      return distanceA - distanceB;
    })

    return list;
  }

  async getDistance(address) {
    let distance = "";
    let uri = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";
    uri += "&origins=" + coords;
    uri += "&destinations=" + address;
    uri += "&key=" + googleMapsKey;
    try {
      let response = await fetch(uri);
      let content = await response.json();
      let element = content.rows[0].elements[0];
      distance = element.distance.text;
    } catch(error) {
      console.log(error);
    }
    return distance;
  }

  async getResults() {
    let resultList = [];
    for (let i = 0; i < shops.length; i++) {
      let shop = shops[i];
      let address = [];
      let result;
      address.push(shop.address);
      address.push(shop.city + ",");
      address.push(shop.state);
      address.push(shop.zipCode);
      address = address.join(" ");
      uriAddress = address.replace(/\s/g, '+');
      let distance = this.getDistance(uriAddress);
      try {
        await Promise.resolve(distance).then((resolved) => {
          distance = resolved;
          result = {name: shop.name, address: address, distance: distance};
          resultList.push(result);
        })
      } catch(e) {
        console.log(e);
      }
    }
    resultList = this.sortListByDistance(resultList);
    return resultList;
  }

  render() {
    let renderList;
    try {
      Promise.resolve(resultList).then((resolve) => {
        resultList = resolve;
        renderList = resultList.map((item) => {
          if (item) {
            return (
              <Text>
                {item.name}
              </Text>
            )
          }
        })
      })
      console.log(renderList);
    } catch(error) {
      console.log(error);
    }

    return(
      <ScrollView style={styles.container}>
        <TopBar navigator={this.props.navigator} text={"Flare Results"}/>
        {renderList}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

export default Results;
