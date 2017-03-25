'use strict';

import React, { Component } from 'react';
var Realm = require('realm');

/* will become barber schema in other app */
const userSchema = {
  name: 'User',
  primaryKey: 'email',
  properties: {
    firstName: 'string',
    lastName: 'string',
    email: {type: 'string', indexed: true},
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
    address: 'string',
    state: 'string',
    city: 'string',
    zipCode: 'string',
    rating: {type: 'double', optional: true},
    employees: {type: 'list', objectType: 'User'},
    image: {type: 'string', optional: true},
    compareName: 'string'
  }
}

const customerSchema = {
  name: 'Customer',
  primaryKey: 'email',
  properties: {
    firstName: 'string',
    lastName: 'string',
    email: {type: 'string', indexed: true},
    phone: 'string',
    password: 'string',
    service: 'string'
  }
};

export let database = new Realm({
  schema: [userSchema, shopSchema, customerSchema],
  schemaVersion: 22
});
