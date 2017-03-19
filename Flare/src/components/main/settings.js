import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

import TopBar from '../../elements/top-bar';

class Settings extends Component{

  render() {
    return(
      <View style={styles.container}>
        <TopBar text="Profile" navigator={this.props.navigator}/>
        <View style={styles.imagePlaceholder}></View>
        <TextInput
          style={styles.input}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
        />
        <TouchableOpacity>
          <Text>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePlaceholder: {
    marginLeft: 137,
    marginVertical: 20,
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: 'skyblue'
  },
  input: {
    marginVertical: 10,
    marginLeft: 15,
  }

});

export default Settings;
