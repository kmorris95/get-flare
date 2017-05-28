import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  PickerIOS,
  TouchableHighlight,
  TouchableOpacity,
  ListView
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

import { database } from '../../database';
import TopBar from '../../elements/top-bar';
import { colors } from '../../constants/flare-constants';
import { googleMapsKey } from '../../constants/api-keys';

let shops;
let coords;
let ds;
let GOOGLE_DISTANCE_URI_START = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';

class Results extends Component{

  constructor(props) {
    super(props);
    shops = database.objects('Shop');
    coords = props.coords;
    this.state = {
      resultList: null
    }
  }

  navigateBack() {
    this.props.navigator.pop();
  }

  componentDidMount() {
    this.getResults();
  }

  extractNumberFromDistance(distance) {
    let length = distance.length;
    distance  = distance.substring(0, length-2);
    distance = parseFloat(distance);
    return distance;
  }

  sortListByDistance(list) {
    let distanceA;
    let distanceB;

    list.sort((a, b) => {
      distanceA = this.extractNumberFromDistance(a.distance);
      distanceB = this.extractNumberFromDistance(b.distance);
      return distanceA - distanceB;
    })
    return list;
  }

  getResult(name, address, uriAddress, list) {
    let result = {};
    let uri = GOOGLE_DISTANCE_URI_START + "&origins=" + coords;
    uri += "&destinations=" + uriAddress;
    uri += "&key=" + googleMapsKey;
    fetch(uri)
      .then((response) => response.json())
      .then((responseData) => {
        let distance = responseData.rows[0].elements[0].distance.text;
        result = {name: name, address: address, distance: distance};
        list.push(result);
        this.setState({resultList: list});
      }).done();
  }

  getResults() {
    let list = [];
    for (let i = 0; i < shops.length; i++) {
      let shop = shops[i];
      let address = [];
      address.push(shop.address);
      address.push(shop.city + ",");
      address.push(shop.state);
      address.push(shop.zipCode);
      address = address.join(" ");
      uriAddress = address.replace(/\s/g, '+');
      this.getResult(shop.name, address, uriAddress, list);
    }
    //this.state.list = this.sortListByDistance(resultList);
    //return resultList;
  }

  navigateToShop(name, address) {

  }

  renderList() {
    if (this.state.resultList === null) {
      return (
        <Text>
          Loading...
        </Text>
      )
    } else {
      let list = this.sortListByDistance(this.state.resultList);
      list = list.map((element) => {
        return (
          <TouchableHighlight
            style={styles.shopButton}
            onPress={this.navigateToShop.bind(this, element.name, element.address)}
            underlayColor={colors.lightgray}
            key={element.name}
          >
            <Text>
              <Text>
                {element.name}
              </Text>
              <Text style={styles.address}>
                {"\n" + element.address + " - "}
              </Text>
              <Text style={styles.distance}>
                {element.distance}
              </Text>
            </Text>
        </TouchableHighlight>
        )
      });
      return list;
    }
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.navigateBack.bind(this)}
          >
            <Text style={styles.back}>
              &#60;
            </Text>
          </TouchableOpacity>
          <Text style={styles.pageHeader}>
            Flare Results
          </Text>
        </View>
        {this.renderList()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
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
    marginHorizontal: 114,
    marginTop: 23,
    width: 200,
    color: colors.teal,
    fontSize: 17,
    fontWeight: '500'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  outerText: {

  },
  shopButton: {
    height: 45,
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  address: {
    color: '#616266',
    fontSize: 11
  },
  distance: {
    fontWeight: '700'
  }
});

export default Results;
