const jwt = require('jsonwebtoken');
const medels = require('../models/index');
const bcrypt = require('bcryptjs');

var authService = {
          signUser: function(user) {
                    const token = jwt.sign(
                              {
                                        Email: user.Email,
                                        userId: user.userId
                              },
                              'secretkey',
                              {
                                        expiresIn: '1h'
                              }
                    );
                    return token;
          },
          verifyUser: function(token) {
                    try{
                              let decoded = jwt.verify(token, 'secretkey');
                              console.log(decoded);
                              return models.users.findByPk(decoded.userId);
                    } catch(err) {
                              console.log(err);
                              return null;
                    }
          },
          hashPassword: function(plainTextPassword) {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(plainTextPassword, salt);
                    return hash;
          },
          comparePasswords: function(plainTextPassword, hashedPassword) {
                    return bcrypt.compareSync(plainTextPassword, hashedPassword)
          }
}
module.exports = authService;