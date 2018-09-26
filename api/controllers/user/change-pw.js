module.exports = {


  friendlyName: 'Change user password',


  description: '',


  inputs: {
    password: {
      description: 'New User password.',
      type: 'string',
      minLength: 6,
      required: true
    },
    passwordConfirm: {
      description: 'New User password confirmation.',
      type: 'string',
      minLength: 6,
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    if (inputs.password !== inputs.passwordConfirm) {
      throw new Error(sails.__('VALIDATION.PASSWORDS_MISMATCH'));
    }

    const user = await User.update({
        email: this.req.user.data.email
      }, {
        password: await sails.helpers.passwords.hashPassword(inputs.password)
      })
      .fetch();
    return exits.success(user[0]);

  }


};
