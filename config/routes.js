/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /user': {
    action: 'user/index'
  },
  'POST /user/signup': {
    action: 'user/signup'
  },
  'POST /user/login': {
    action: 'user/login'
  },
  'GET /questions': {
    action: 'questions/index'
  },
  'GET /questions/:id/answers': {
    action: 'questions/single/answers'
  },
  'POST /questions/hash-answers': {
    action: 'questions/hash-answers'
  },
  'POST /playground/execute': {
    action: 'playground/execute'
  }
};
