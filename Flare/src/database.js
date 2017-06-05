'use strict';


import React, { Component } from 'react';
var Realm = require('realm');
import { userSchema, customerSchema, shopSchema } from './models/index';
import config from '../config';

let database = null;

Realm.Sync.User.login(config.auth_uri, config.default_login, config.default_password,
  (error, user) => {
    if (!error) {
      database = new Realm({
        sync: {
          user,
          url: config.db_uri
        },
        schema: [userSchema, shopSchema, customerSchema],
        schemaVersion: 23
      });
      console.log("Connected");
    } else {
      console.log(error);
    }
});

export default database;


// export let database = new Realm({
//   schema: [userSchema, shopSchema, customerSchema],
//   schemaVersion: 23
// });


/*export let database = new Realm({
  schema: [userSchema, shopSchema, customerSchema],
  schemaVersion: 23
});*/
