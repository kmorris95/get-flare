class User {}
User.schema = {
  name: 'User',
  properties: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    password: 'string',
    service: 'string'
  }
};

export default User;
