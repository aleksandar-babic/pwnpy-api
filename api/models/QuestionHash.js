/**
 * QuestionHash.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    questions: {
      description: 'Collection of questions that hash is generated for',
      collection: 'question',
      via: 'hashes'
    },
    user: {
      description: 'User that hash is generated for',
      model: 'user'
    },
    difficulty: {
      description: 'Difficulty level of questions.',
      type: 'number',
      isIn: [1, 2, 3]
    }
  },

};
