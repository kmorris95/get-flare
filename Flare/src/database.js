'use strict';

import React, { Component } from 'react';
import { User } from './models/user'
import { Realm } from 'realm'

class Database extends Component {

  constructor(props) {
    super(props);
    let realm = new Realm({schema: [User]});
  }

  addUser(profile) {
    let user = realm.create('User', profile);
  }
}

export default Database;
