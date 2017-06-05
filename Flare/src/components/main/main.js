'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { ListView } from 'realm/react-native';

import { colors } from '../../constants/flare-constants';
import DropDown from '../../elements/drop-down';
import { database } from '../../database';
import Share from '../../elements/share';
var SearchBar = require('react-native-search-bar');

let ds;
let users;
let user;

class Main extends Component {

  constructor(props) {
    super(props);
    users = {}
    user = {};
    console.log(database)
    // users = database.objects('User');
    // user = users.filtered('email = "' + this.props.email + '"');
    // user = user[0];
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      menu: 'inactive',
      dataSource: ds.cloneWithRows(users),
      searchQuery: ''
    };
  }

  componentDidMount() {
    this.refs.searchBar.focus();
  }

  renderMenuToggle() {
    if (this.state.menu === 'inactive') {
      return (<Text
        style={styles.dropDownButton}
        onPress={this.dropMenu.bind(this)}
      >
        &#60;
      </Text>);
    } else {
      return (<Text
        style={styles.dropDownButton}
        onPress={this.raiseMenu.bind(this)}
      >
        &#62;
      </Text>);
    }
  }

  dropMenu = () => {
    this.dropDown.show();
    this.setState({menu: 'active'});
  }

  raiseMenu = () => {
    this.dropDown.hide();
    this.setState({menu: 'inactive'});
  }

  searchStuff = () => {
    let results = [];
    for (var i = 0; i < users.length; i++) {
      let person = users[i];
      let fullName = person.firstName + ' ' + person.lastName;
      if (fullName.includes(this.state.searchQuery)) {
        results.push(person);
      }
    }
    this.setState({dataSource: ds.cloneWithRows(results)});
  }

  clearSearch = () => {
    this.setState({dataSource: ds.cloneWithRows(users)});
  }

  navigateForward(routeName, coords) {
    this.props.navigator.push({
        name: routeName,
        email: this.props.email,
        coords: coords
    });
  }

  navigateBack() {
    this.props.navigator.pop();
  }

  launchFlare() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let coords = latitude + "," + longitude;
        this.navigateForward('Results', coords);
      },
      (error) => {console.log(error)},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.dropDownBar}>
        </View>
        <SearchBar
          ref='searchBar'
          placeholder='Search'
          onChangeText={(text) => {this.setState({searchQuery: text.trim()}); if (!text) this.setState({dataSource: ds.cloneWithRows(users)});}}
          onSearchButtonPress={(text) => {this.searchStuff()}}
          onCancelButtonPress={(text) => {this.clearSearch()}}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(person) => <Share info={person} navigator={this.props.navigator}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
        <TouchableOpacity
          style={styles.flare}
          activeOpacity={0.8}
          onPress={this.launchFlare.bind(this)}
        >
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropDownBar: {
    backgroundColor: colors.lightgray,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropDownButton: {
    marginTop: 20,
    transform: [{ rotate: '-90deg'}],
    color: colors.magenta,
    fontWeight: '700',
    fontSize: 25
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  flare: {
    position: 'absolute',
    top: 610,
    left: 162,
    height: 53,
    width: 53,
    borderRadius: 5,
    backgroundColor: 'red'
  },
  extraBottom: {
    height: 60,
    width: 390,
    backgroundColor: colors.lightgray,
    position: 'absolute',
    top: 200
  }
});

export default Main;
