const express = require("express");
const routes = express.Router();
const db = require("../models/tables");
const Joi = require("joi");
const Poll = db.poll;
const Op = db.Sequelize.Op;

const validatePoll = (poll) => {
  const schema = Joi.object({
    text: Joi.string().min(5).required(),
  });
  return schema.validate(poll);
};

routes.get("/:id", async (req, res) => {
  console.log("");  //
  try {
    const poll = await Poll.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(poll);
  } catch (error) {
    res.send(error.message);
  }
});

routes.post("/", async (req, res) => {
  // validate the data is correct or not
  const { error } = validatePoll(req.body);
  if (error) return res.send(400).send(error.details[0].message);
  const poll = { text: req.body.text };
  console.log(req.body.text);
  // if the validation is correct then create a new poll
  try {
    const poll2 = await Poll.create(poll);
    res.send(poll2);
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = routes;
