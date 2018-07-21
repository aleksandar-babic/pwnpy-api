module.exports = {


  friendlyName: 'Answers',


  description: 'Returns answers for given question in randomized order.',


  inputs: {},


  exits: {
    notFound: {
      description: 'Did not find any answers for given question.',
      responseType: 'notFound'
    },
  },


  fn: async function (inputs, exits) {
    const question = this.req.params.id;
    const answers = await Answer.find({
      question
    });

    if (!answers || answers.length === 0) {
      throw 'notFound';
    }

    const shuffledAnswers = answers.sort(() => 0.5 - Math.random());
    return exits.success(shuffledAnswers);
  }


};
