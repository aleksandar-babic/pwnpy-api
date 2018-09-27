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
    const userId = this.req.user.data.id;
    const user = await User.findOne({
      id: userId
    }).populate('completedQuestions');

    const completedQuestionsIds = user.completedQuestions.map(q => q.id);
    const questions = await Question.find({
      id: {
        nin: completedQuestionsIds
      },
      difficulty: inputs.difficulty
    }).limit(inputs.limit).populate('answers');

    if (!questions || questions.length === 0) {
      throw 'notFound';
    }

    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

    const shuffledQuestionsIds = shuffledQuestions.map(q => q.id);
    const questionHash = await QuestionHash.create({
      questions: shuffledQuestionsIds,
      user: userId,
      difficulty: inputs.difficulty
    });

    return exits.success({
      questions: shuffledQuestions,
      hash: questionHash
    });
  }


};
