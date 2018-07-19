module.exports = {


  friendlyName: 'Seed users',


  description: 'Seed users in database',


  inputs: {
    amount: {
      description: 'Amount of users to be seeded',
      type: 'number',
      defaultsTo: 5
    }
  },


  fn: async function (inputs, exits) {
    sails.log('Dropping User collection..');
    try {
      await User.destroy({}).toPromise();
      sails.log('Successfully dropped User collection..');
    } catch (err) {
      sails.log('error while dropping User collection', err);
      exits.error(err);
    }

    sails.log('Starting users seeder..');
    const totalUsers = inputs.amount;
    const faker = require('faker');
    let fakeUsers = [];
    for (let i = 0; i < totalUsers; ++i) {
      fakeUsers.push(await User.create({
        "email": faker.internet.email().toLowerCase(),
        "password": "userseed",
        "passwordConfirm": "userseed"
      }).fetch());
    }

    return exits.success(fakeUsers);
  }


};
