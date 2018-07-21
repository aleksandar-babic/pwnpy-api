/**
 * Answer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    value: {
      description: 'Value of answer',
      type: 'string',
      required: true
    },
    isCorrect: {
      description: 'Flag to determinate if answer is correct for referenced question',
      type: 'boolean',
      required: true
    },
    question: {
      description: 'Question that answer relates to',
      model: 'question'
    }
  },
  customToJSON() {
    return _.omit(this, ['isCorrect']);
  }
};
