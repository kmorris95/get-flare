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
    shop: 'string',
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
    rating: 'double',
    employees: {type: 'list', objectType: 'User'},
    image: 'string'
  }
}

export let database = new Realm({
  schema: [userSchema, shopSchema],
  schemaVersion: 11
});
