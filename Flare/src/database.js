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
    service: 'string'
  }
};

export let database = new Realm({
  schema: [userSchema],
  schemaVersion: 6
});
