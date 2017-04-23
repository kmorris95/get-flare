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
import Share from '../../elements/share';

import { database } from '../../database';
import TopBar from '../../elements/top-bar';
import VerticalSelect from '../../elements/vertical-select';
import HorizontalSelect from '../../elements/horizontal-select';
import StyleItem from '../../elements/style-item';
import { colors } from '../../constants/flare-constants';
import { hairstyles } from '../../staticData/hairstyles';
import Schedule from '../../elements/schedule';
var moment = require('moment');

let user;

class Results extends Component{
  constructor(props) {
    super(props);
    users = database.objects('User');
    user = users.filtered('email = "' + this.props.email + '"');
    user = user[0];
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(users),
    };
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <TopBar navigator={this.props.navigator} text={"Flare Results"}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(person) => <Share info={person} navigator={this.props.navigator}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Results;
