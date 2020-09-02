const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { create } = require('../models/User');

// handel errors
const handleErrors = (err) => {
  let errors = {};

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  // validate errors
  if (err._message == 'user validation failed') {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  } else {
    return { error: err };
  }
};

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'jwt-private-key', {
    expiresIn: maxAge,
  });
};

/*=============================================
=             SIGNUP CONTROLLERS              =
=============================================*/

// Render Signup Page
module.exports.signup_get = (req, res) => {
  res.render('signup');
};

// Post request: Signup user
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

/*=============================================
=              LOGIN CONTROLLERS              =
=============================================*/

// Render Login page
module.exports.login_get = (req, res) => {
  res.render('login');
};

// Post request: Login user
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ error: err.message });
  }
};

/*=============================================
=           LOGOUT CONTROllER                 =
=============================================*/

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
