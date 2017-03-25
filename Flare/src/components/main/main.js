'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  StatusBar,
  Text,
  TextInput
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
    users = database.objects('User');
    user = users.filtered('email = "' + this.props.email + '"');
    user = user[0];
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

  navigateForward(routeName) {
    this.props.navigator.push({
        name: routeName
    });
  }

  navigateBack() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.dropDownBar}>
          {this.renderMenuToggle()}
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
          renderFooter={() => <View style={styles.loadMore}><Text>Load More</Text></View>}
        />
        <DropDown
          navigator={this.props.navigator}
          ref={(dropDown) => this.dropDown = dropDown}
          email={"kmorris95@comcast.net"}
        />
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
    height: 50,
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
  loadMore: {
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Main;
