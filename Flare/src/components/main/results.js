import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  PickerIOS,
  TouchableOpacity,
  ListView
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

import { database } from '../../database';
import TopBar from '../../elements/top-bar';
import ResultItem from '../../elements/result-item';
import { colors } from '../../constants/flare-constants';
import { googleMapsKey } from '../../constants/api-keys';

let shops;
let resultList;
let coords;
let ds;

class Results extends Component{
  constructor(props) {
    super(props);
    shops = database.objects('Shop');
    coords = props.coords;
    //resultList = [];
    resultList = this.getResults();
    //ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      //dataSource: ds.cloneWithRows(resultList)
    }
  }

  extractNumberFromDistance(distance) {
    //console.log(distance);
    // let length = distance.length;
    // distance  = distance.substring(0, length-2);
    // distance = parseFloat(distance);
    // return distance;
  }

  sortListByDistance(list) {
    console.log(resultList)
    let distanceA;
    let distanceB;

    for (let i = 0; i < list.length; i++) {
      let element = list[i];
      console.log(element);
    }

    return list;
  }

  getResult(name, address, uriAddress, list) {
    let result = {};
    let uri = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";
    uri += "&origins=" + coords;
    uri += "&destinations=" + uriAddress;
    uri += "&key=" + googleMapsKey;
    try {
      let response = fetch(uri).then((content) => {
        content = content.json().then((element) => {
          element = element.rows[0].elements[0];
          result.name = name;
          result.address = address;
          result.distance = element.distance.text;
          return result;
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    } catch(error) {
      console.log(error);
    }
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
    let object = list;
    console.log(Object.values(list));
    //console.log(this.state.list);
    //this.state.list = this.sortListByDistance(resultList);
    //return resultList;
  }

  render() {
    // try {
    //   Promise.resolve(resultList).then((resolved) => {
    //     renderList = resolved;
    //   })
    // } catch(e) {
    //   console.log(e);
    // }

    // <ListView
    //   dataSource={this.state.dataSource}
    //   renderRow={(item) => <ResultItem item={item}/>}
    //   renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    // />

    // let list;
    // try {
    //   Promise.resolve(resultList).then((resolved) => {
    //     resultList = resolved;
    //     list = resultList.map((item) => {
    //       return (
    //         item.name
    //       )
    //     })
    //   })
    // } catch(e) {
    //   console.log(e);
    // }

    return(
      <ScrollView style={styles.container}>
        <TopBar navigator={this.props.navigator} text={"Flare Results"}/>
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
