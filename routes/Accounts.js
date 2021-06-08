const router = require('express').Router();
const Accounts = require('../models/Accounts');

// validation
const Joi = require('@hapi/joi');

const schemaAccounts = Joi.object({
  email: Joi.string().min(6).max(255).required(),
  password_1: Joi.string().min(4).max(1024).required(),
  password_2: Joi.string().min(4).max(1024).required(),
  responsable: Joi.string().min(4).max(255).required(),
  responsable_email: Joi.string().min(6).max(255).required(),
  progress: Joi.string().min(1).max(255).required(),
  comment: Joi.string().min(4).max(1024),
})

router.post('/accounts', async (req, res) => {

  // validate user
  const { error } = schemaAccounts.validate(req.body)

  if (error) {
    return res.status(400).json(
      { error: error.details[0].message }
    )
  }

  const accounts = new Accounts({
    email: req.body.email,
    password_1: req.body.password_1,
    password_2: req.body.password_2,
    responsable: req.body.responsable,
    responsable_email: req.body.responsable_email,
    progress: req.body.progress,
    comment: req.body.comment,
  });
  try {
    const savedAccount = await accounts.save();
    res.json({
      error: null,
      data: savedAccount
    })
  } catch (error) {
    res.status(400).json({ error })
  }
});

module.exports = router;