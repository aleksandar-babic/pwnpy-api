const axios = require('axios');

module.exports = {


  friendlyName: 'Execute',


  description: 'Send request to microservice API to run python source code.',


  inputs: {
    source: {
      description: 'Python source code as file',
      type: 'ref'
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    if (!inputs.source) {
      return exits.error('Couldn\'t read input');
    }
    const source = inputs.source.stream;
    axios.post(sails.config.microserviceUrl, source)
      .then(payload => exits.success(payload.data))
      .catch(err => exits.error(err.message));
  }

};
