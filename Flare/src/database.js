'use strict';

import React, { Component } from 'react';
var Realm = require('realm');

const userSchema = {
  name: 'User',
  primaryKey: 'email',
  properties: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    password: 'string',
    confirmPassword: 'string',
    service: 'string',
    shopName: {type: 'string', optional: true},
    rating: {type: 'double', optional: true},
    image: {type: 'string', optional: true},
    styles: {type: 'data', optional: true}
  }
};

const shopSchema = {
  name: 'Shop',
  properties: {
    name: 'string',
    /*address: 'string',
    state: 'string',
    city: 'string',
    zipCode: 'string',
    rating: {type: 'double', optional: true},
    employees: {type: 'list', objectType: 'User'},
    image: {type: 'string', optional: true},*/
    compareName: 'string'
  }
}

export let database = new Realm({
  schema: [userSchema, shopSchema],
  schemaVersion: 18
});
