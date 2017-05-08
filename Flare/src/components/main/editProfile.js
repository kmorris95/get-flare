import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ListView
} from 'react-native';

import { database } from '../../database';
import TopBar from '../../elements/top-bar';
import StyleItem from '../../elements/style-item';
import { colors } from '../../constants/flare-constants';

let user;

class EditProfile extends Component{
  constructor(props) {
    super(props);
    users = database.objects('User');
    user = users.filtered('email = "' + this.props.email + '"');
    user = user[0];
  }

  render() {
    return(
      <View style={styles.container}>
        <TopBar navigator={this.props.navigator}/>
        <View style={styles.image}></View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: 'black',
    marginLeft: 135,
    marginVertical: 30,
    borderRadius: 5,
    height: 100,
    width: 100
  },
  contact: {
    backgroundColor: colors.lightgray,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  name: {
    color: colors.teal,
    fontSize: 20,
    fontWeight: "500"
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  address: {
    fontSize: 10,
  }
});

export default EditProfile;
