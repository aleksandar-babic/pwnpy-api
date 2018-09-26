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
    },
    hashes: {
      description: 'Collections of question hashes that are generated for user',
      collection: 'questionhash',
      via: 'user'
    },
    darkTheme: {
      description: 'Boolean value for user preffered theme',
      type: 'boolean',
      defaultsTo: false
    },
    completedQuestions: {
      description: 'Collection of completed questions by user',
      collection: 'question',
      via: 'usersCompleted'
    },
    experience: {
      description: 'User\s experience points',
      type: 'number',
      defaultsTo: 0
    }
  },
  beforeCreate(vals, proceed) {
    if (vals.password && vals.passwordConfirm && vals.password !== vals.passwordConfirm) {
      return proceed(new Error(sails.__('VALIDATION.PASSWORDS_MISMATCH')));
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
