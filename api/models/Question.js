/**
 * Question.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    body: {
      description: 'Body of question.',
      type: 'string',
      required: true
    },
    difficulty: {
      description: 'Level of difficulity of question, has to be between 1 and 3',
      type: 'number',
      defaultsTo: 1,
      isIn: [1, 2, 3]
    },
    answers: {
      description: 'Collection of possible answers for question',
      collection: 'answer',
      via: 'question'
    }
  },

};
