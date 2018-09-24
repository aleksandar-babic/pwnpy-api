module.exports = {


  friendlyName: 'Edit',


  description: 'Edit user.',


  inputs: {
    isDarkTheme: {
      description: 'Boolean for user preference of theme.',
      type: 'boolean',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const user = await User.update({
        email: this.req.user.data.email
      }, {
        darkTheme: inputs.isDarkTheme
      })
      .fetch();
    return exits.success(user[0]);

  }


};
