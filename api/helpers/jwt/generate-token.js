const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Generate token',


  description: '',


  inputs: {
    data: {
      type: 'ref',
      description: 'Payload to put in JWT token.',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const expiresIn = sails.config.security.jwt.expiresIn;
    const jwtSecret = sails.config.security.jwt.secret;
    const data = inputs.data;
    return exits.success(jwt.sign({
      data
    }, jwtSecret, {
      expiresIn
    }));
  }


};
