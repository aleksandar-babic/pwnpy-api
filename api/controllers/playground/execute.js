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
      if (!this.req.file('source')) {
        return exits.error('Couldn\'t read from form-data source.')
      }
      const source = this.req.file('source')._files[0];
      const res = await sails.helpers.microservice.execute(source);

      if (res.exitCode === 0) {
        const user = await User.findOne({
          id: this.req.user.data.id
        });

        await User.update({
          id: user.id
        }, {
          experience: user.experience + 50
        });
      }
      return exits.success(res);
    } catch (err) {
      return exits.error(err.message)
    }
  }

};
