module.exports = {


  friendlyName: 'Index',


  description: 'Index user.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const user = await User.findOne({
      id: this.req.user.data.id
    }).populate('completedQuestions');

    const totalQuestions = {
      beginner: await Question.count({
        difficulty: 1
      }),
      intermediate: await Question.count({
        difficulty: 2
      }),
      pro: await Question.count({
        difficulty: 3
      })
    };

    return exits.success({
      ...user,
      totalQuestions
    });
  }


};
