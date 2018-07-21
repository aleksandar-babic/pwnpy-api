module.exports = {


  friendlyName: 'Index',


  description: 'Index questions in randomized order.',


  inputs: {
    limit: {
      description: 'Amount of questions to get.',
      type: 'number'
    },
    difficulty: {
      description: 'Difficulty level of question.',
      type: 'number',
      defaultsTo: 1,
      isIn: [1, 2, 3]
    }
  },


  exits: {
    notFound: {
      description: 'Did not find any questions with set inputs.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    const questions = await Question.find({
      difficulty: inputs.difficulty
    }).limit(inputs.limit);

    if (!questions || questions.length === 0) {
      throw 'notFound';
    }

    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    return exits.success(shuffledQuestions);
  }


};
