const User = require('../models/User');

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
    return { general: 'Something went wrong' };
  }
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
};
