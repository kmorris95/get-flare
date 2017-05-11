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
let coords;
let ds;
let GOOGLE_DISTANCE_URI_START = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';

class Results extends Component{

  constructor(props) {
    super(props);
    shops = database.objects('Shop');
    coords = props.coords;
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      resultList: [],
      //dataSource: ds.cloneWithRows(this.resultList),
      distance: ''
    }
  }

  componentDidMount() {
    this.getResults();
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

  getResult(name, address, uriAddress) {
    let result = {};
    let uri = GOOGLE_DISTANCE_URI_START + "&origins=" + coords;
    uri += "&destinations=" + uriAddress;
    uri += "&key=" + googleMapsKey;
    try {
      fetch(uri)
        .then((response) => response.json())
        .then((responseData) => {
          let distance = responseData.rows[0].elements[0].distance.text;
          result = {name: name, address: address, distance: distance};
          let list = this.state.resultList;
          list.push(result);
          this.setState({resultList: list});
          // console.log(distance)
          // if (this.state.resultList === null) {
          //   this.setState({resultList: []})
          // }
          // element = element.rows[0].elements[0];
          // result.distance = element.distance.text;
          // return result;
        }).done();
    } catch(error) {
      console.log(error);
    }
  }

  getResults() {
    let shop = shops[0];
    let address = [];
    address.push(shop.address);
    address.push(shop.city + ",");
    address.push(shop.state);
    address.push(shop.zipCode);
    address = address.join(" ");
    uriAddress = address.replace(/\s/g, '+');

    let uri = GOOGLE_DISTANCE_URI_START + "&origins=" + coords;
    uri += "&destinations=" + uriAddress;
    uri += "&key=" + googleMapsKey;

    fetch(uri)
      .then((response) => response.json())
      .then((responseData) => {
        let distance = responseData.rows[0].elements[0].distance.text;
        this.setState({distance: distance});
        // result = {name: name, address: address, distance: distance};
        // let list = this.state.resultList;
        // list.push(result);
        // this.setState({resultList: list});
        // console.log(distance)
        // if (this.state.resultList === null) {
        //   this.setState({resultList: []})
        // }
        // element = element.rows[0].elements[0];
        // result.distance = element.distance.text;
        // return result;
      }).done();

    // for (let i = 0; i < shops.length; i++) {
    //   let shop = shops[i];
    //   let address = [];
    //   address.push(shop.address);
    //   address.push(shop.city + ",");
    //   address.push(shop.state);
    //   address.push(shop.zipCode);
    //   address = address.join(" ");
    //   uriAddress = address.replace(/\s/g, '+');
    //   let distance = this.getResult(shop.name, address, uriAddress);
    //   console.log(this.state.resultList)
    // }
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
        <Text>
          {this.state.distance}
        </Text>
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
