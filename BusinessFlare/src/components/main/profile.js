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
import VerticalSelect from '../../elements/vertical-select';
import HorizontalSelect from '../../elements/horizontal-select';
import StyleItem from '../../elements/style-item';
import { colors } from '../../constants/flare-constants';
import { stripePublishKey } from '../../constants/api-keys';
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
      days: this.getDays(),
      times: this.getTimes(),
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
    for (let i = 0; i < 8; i++) {
      let today_day = today.getDate() + 1;
      day = new Date(today.setDate(today_day));
      let string = day.toDateString();
      string = string.replace(year, '');
      let remove = string.substring(3, 7);
      day = string.replace(remove, '').trim();
      days.push(day);
    }
    return days;
  }

  getTimes() {
    let times = [];
    let start = moment('1995-04-10 08:00');
    for (var i = 0; i < 21; i++) {
      let interval = 30 * i;
      let time = moment(start).add(interval, 'minutes').format('hh:mm');
      times.push(time);
    }
    return times;
  }

  submit() {
    let cardDetails = {
      'card[number]': '4242424242424242',
      'card[exp_month]': '12',
      'card[exp_year]': '2022',
      'card[cvc]': '123'
    };
    let formBody = [];
    for (let property in cardDetails) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(cardDetails[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody);


    fetch("https://api.stripe.com/v1/tokens", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-urlencoded',
        'Authorization': 'Bearer ' + stripePublishKey
      },
      body: formBody
    }).then((response) => {
      console.log(response)
      /*response.json().then(resolved => {
        debugger;
      })*/
    }).catch((e) => console.log(e));
  }

  render() {
    return(
      <ScrollView style={styles.container}>
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
        <VerticalSelect list={hairstyles} maxHeight={245}/>
        <View style={styles.todayArea}>
          <Text style={styles.today}>Today: {this.today()}</Text>
          <Text style={styles.today}>Choose an appointment date and time:</Text>
        </View>
        <HorizontalSelect list={this.state.days}/>
        <HorizontalSelect list={this.state.times}/>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this.submit.bind(this)}
        >
          <Text
            style={styles.buttonText}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  button: {
    backgroundColor: colors.teal,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400
  },
  buttonText: {
    color: 'white'
  }
});

export default Profile;
