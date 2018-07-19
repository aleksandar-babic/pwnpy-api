module.exports = {


  friendlyName: 'Seed data',


  description: 'Seed questions and answers in database',


  inputs: {},


  fn: async function (inputs, exits) {
    sails.log('Dropping Question and Answer collections..');
    try {
      await Promise.all([Question.destroy({}).toPromise(), Answer.destroy({}).toPromise()]);
      sails.log('Successfully dropped Question and Answer collections..');
    } catch (err) {
      sails.log('error while dropping Question and Answer collections', err);
      exits.error(err);
    }

    sails.log('Starting question and answers seeder..');
    let seededQuestions = await Question.createEach(data.map(q => ({
      body: q.body
    }))).fetch();

    seededQuestions.forEach(async seededQuestion => {
      const answers = _.find(data, dataQuestion => seededQuestion.body === dataQuestion.body).answers
        .map(ans => ({
          ...ans,
          question: seededQuestion.id
        }));
      let seededAnswers = await Answer.createEach(answers).fetch();
    });

    return exits.success(await Question.find().populate('answers'));
  }


};

const data = [{
  body: 'Which of the following statements is true?',
  answers: [{
      value: 'Python is a high level programming language.',
      isCorrect: false
    },
    {
      value: 'Python is an interpreted language.',
      isCorrect: false
    },
    {
      value: 'Python is an object-oriented language.',
      isCorrect: false
    },
    {
      value: 'All of the above.',
      isCorrect: true
    }
  ]
}, {
  body: 'What is used to define a block of code (body of loop, function etc.) in Python?',
  answers: [{
      value: 'Curly braces',
      isCorrect: false
    },
    {
      value: 'Parenthesis',
      isCorrect: false
    },
    {
      value: 'Indentation',
      isCorrect: true
    },
    {
      value: 'Quotation',
      isCorrect: false
    }
  ]
}];
