'use strict';

import React, { Component } from 'react';
import { Alert } from 'react-native';
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
    service: 'string'
  }
};

export let database = new Realm({
  schema: [userSchema],
  schemaVersion: 5
});
