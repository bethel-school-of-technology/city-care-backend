const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcryptjs');

var authService = {
  signUser: function (user) {
    const token = jwt.sign({
      email: user.email,
      username: user.username,
      userId: user.id
    },
      'super_cali_fragi_listic_expi_alley_docious_a_longer_secret_key_is_better', {
      expiresIn: '1h'
    }
    );
    return token;
  },
  verifyUser: function (token) { //<--- receive JWT token as parameter
    try {
      let decoded = jwt.verify(token, 'super_cali_fragi_listic_expi_alley_docious_a_longer_secret_key_is_better');
      //<--- Decrypt token using same key used to encrypt
      console.log(decoded);
      return models.users.findByPk(decoded.userId); //<--- Return result of database query as promise
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function (plainTextPassword) {
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword)
  }
}

module.exports = authService;