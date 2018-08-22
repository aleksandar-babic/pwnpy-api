module.exports = {


  friendlyName: 'Execute',


  description: 'Takes python source code as payload, sends it to microservice which runs code and returns stdout,stderr and exit code.',


  inputs: {
    source: {
      description: 'Python source code sent as file',
      type: 'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const source = this.req.file('source')._files[0];
      const res = await sails.helpers.microservice.execute(source);
      return exits.success(res);
    } catch (err) {
      return exits.error(err.message)
    }
  }

};
