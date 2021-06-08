const router = require('express').Router();
const User = require('../models/User');

// JSON Web Token
const jwt = require('jsonwebtoken');

// password
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');

const schemaRegLogin = Joi.object({
  user_name: Joi.string().min(4).max(255).required(),
  password: Joi.string().min(4).max(1024).required()
})

router.post('/register', async (req, res) => {

  // validate user
  const { error } = schemaRegLogin.validate(req.body)

  if (error) {
    return res.status(400).json(
      { error: error.details[0].message }
    )
  }

  const isUserNameExist = await User.findOne({ user_name: req.body.user_name });
  if (isUserNameExist) {
    return res.status(400).json(
      { error: 'Nombre de Usuario ya registrado' }
    )
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    user_name: req.body.user_name,
    password: password
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser
    })
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post('/login', async (req, res) => {
  // validations
  const { error } = schemaRegLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })

  const user = await User.findOne({ user_name: req.body.user_name });
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

  const token = jwt.sign({
    user_name: user.user_name,
    id: user._id
  }, process.env.TOKEN_SECRET);

  res.json({
    error: null,
    data: 'exito bienvenido',
    token
  });


})

module.exports = router;