module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    email: {
      description: 'E-mail to login user with.',
      type: 'string',
      isEmail: true,
      required: true
    },
    password: {
      description: 'User password.',
      type: 'string',
      minLength: 6,
      required: true
    }
  },


  exits: {
    badCredentials: {
      description: 'Provided e-mail or password are not correct.',
      responseType: 'unauthorized'
    }
  },


  fn: async function (inputs, exits) {
    const user = await User.findOne({
      email: inputs.email.toLowerCase()
    });

    if (!user) {
      throw 'badCredentials'
    }

    await sails.helpers.passwords.checkPassword(inputs.password, user.password)
      .intercept('incorrect', 'badCredentials');

    return exits.success({
      user,
      token: await sails.helpers.jwt.generateToken(user)
    });

  }


};
