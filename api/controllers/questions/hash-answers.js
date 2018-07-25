module.exports = {


  friendlyName: 'Hash answers',


  description: 'Returns question and answer ids for which user sent correct answer',


  inputs: {
    hash: {
      description: 'Question hash that answers should be given for',
      type: 'string',
      required: true
    },
    answers: {
      description: 'Answers to check if they are correct for questions from hash',
      type: 'ref',
      required: true
    }
  },


  exits: {
    notFound: {
      description: 'Did not find hash in database.',
      responseType: 'notFound'
    },
    wrongUser: {
      description: 'Hash does not belong to logged in user.',
      responseType: 'unauthorized'
    }
  },


  fn: async function (inputs, exits) {

    const hash = await QuestionHash.findOne({
      id: inputs.hash
    }).populate('questions');

    if (!hash) {
      throw 'notFound';
    }

    if (hash.user !== this.req.user.data.id) {
      throw 'wrongUser';
    }

    const userAnswers = inputs.answers;
    const questions = await getRealQuestionsForHash(hash);
    const correctAnswersArr = userAnswers.filter(ans => {
      for (let i = 0; i < questions.length; ++i) {
        if (questions[i].id !== ans.question) {
          continue;
        }

        const answers = questions[i].answers;
        for (let j = 0; j < answers.length; ++j) {
          if (answers[j].id === ans.answer && answers[j].isCorrect) {
            return true;
          }
        }
      }
    });

    await QuestionHash.destroy({
      id: inputs.hash
    });

    return exits.success(correctAnswersArr);

  }


};

const createRealAnswerObj = (question) => {
  const answers = question.answers;
  return answers.map(ans => ({
    id: ans.id,
    isCorrect: ans.isCorrect
  }))
}

const getRealQuestionsForHash = async (hash) => {
  const questions = await Question.find().where({
    'id': hash.questions.map(q => q.id)
  }).populate('answers');

  if (!questions) {
    Promise.reject();
  }

  const answersArr = questions.map(q =>
    ({
      id: q.id,
      answers: createRealAnswerObj(q)
    })
  );

  return Promise.resolve(answersArr);
}
