/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      description: 'E-mail to sign up user with.',
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    password: {
      description: 'User password.',
      type: 'string',
      minLength: 6,
      required: true
    }
  },
  beforeCreate(vals, proceed) {
    if (vals.password && vals.passwordConfirm && vals.password !== vals.passwordConfirm) {
      return proceed(new Error('Passwords do not match.'));
    }
    sails.helpers.passwords.hashPassword(vals.password).exec((err, hash) => {
      if (err) {
        return proceed(err);
      }
      vals.password = hash;
      return proceed();
    });
  },
  customToJSON() {
    return _.omit(this, ['password', 'passwordConfirm']);
  }
};
