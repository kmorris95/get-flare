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
import { hairstyles } from '../../staticData/hairstyles';
import Schedule from '../../elements/schedule';
var moment = require('moment');

let user;

class Profile extends Component{
  constructor(props) {
    super(props);
    users = database.objects('User');
    user = users.filtered('email = "' + this.props.email + '"');
    user = user[0];
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(hairstyles),
      days: ds.cloneWithRows(this.getDays()),
      times: ds.cloneWithRows(this.getTimes()),
      appointmentDate: '',
      appointmentTime: ''
    };
  }

  today() {
    let today = new Date();
    let year = today.getFullYear();
    today = today.toDateString();
    today = today.replace(year, '');
    return today;
  }

  getDays() {
    let days = [];
    let today = new Date();
    let year = today.getFullYear();
    for (let i = 0; i < 7; i++) {
      let today_day = today.getDate() + 1;
      day = new Date(today.setDate(today_day));
      let string = day.toDateString();
      string = string.replace(year, '');
      let remove = string.substring(3, 7);
      day.text = string.replace(remove, '').trim();
      day.active = false;
      days.push(day);
    }
    console.log(days);
    return days;
  }

  getTimes() {
    let times = [];
    let start = moment('04/10/1995 8:00');
    for (var i = 0; i < 21; i++) {
      let interval = 30 * i;
      let time = {};
      time.text = moment(start).add(interval, 'minutes').format('h:mm');
      time.active = false;
      times.push(time);
    }
    console.log(times);
    return times;
  }

  render() {
    return(
      <View style={styles.container}>
        <TopBar navigator={this.props.navigator}/>
        <View style={styles.image}></View>
        <View style={styles.contact}>
          <Text style={styles.name}>
            {user.firstName + " " + user.lastName}
          </Text>
          <Text style={styles.address}>
            1234 Marshall Rd. Phila, PA 19131
          </Text>
        </View>
        <View style={{maxHeight: 291}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(style) => <StyleItem item={style}/>}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
          />
        </View>
        <View style={styles.todayArea}>
          <Text style={styles.today}>Today: {this.today()}</Text>
        </View>
        <View>
          <ListView
            dataSource={this.state.days}
            renderRow={(day) => <Schedule item={day}/>}
            horizontal={true}
          />
          <ListView
            dataSource={this.state.times}
            renderRow={(time) => <Schedule item={time}/>}
            horizontal={true}
          />
        </View>
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
    backgroundColor: colors.lightgray,
  },
  address: {
    fontSize: 10,
  },
  todayArea: {
    backgroundColor: colors.lightgray,
    height: 40,
    justifyContent: 'center'
  },
  today: {
    textAlign: 'center',
    color: colors.teal,
    fontSize: 16,
    fontWeight: '700'
  }
});

export default Profile;
