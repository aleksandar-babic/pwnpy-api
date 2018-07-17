module.exports = {


  friendlyName: 'Signup',


  description: 'Signup and login user using JWT authentication.',


  inputs: {
    email: {
      description: 'E-mail to sign up user with.',
      type: 'string',
      isEmail: true,
      required: true
    },
    password: {
      description: 'User password.',
      type: 'string',
      minLength: 6,
      required: true
    },
    passwordConfirm: {
      description: 'User password confirmation.',
      type: 'string',
      minLength: 6,
      required: true
    }
  },


  exits: {
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.'
    }
  },


  fn: async function (inputs, exits) {
    const user = await User.create(inputs)
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .fetch();

    return exits.success({
      user,
      token: await sails.helpers.jwt.generateToken(user)
    });
  }


};
