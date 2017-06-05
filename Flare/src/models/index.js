
/* barber schema*/
export const userSchema = {
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

export const shopSchema = {
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
    compareName: 'string',
    distance: 'string'
  }
}

export const customerSchema = {
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
