const express = require("express");
const routes = express.Router();
const db = require("../models/tables");
const Joi = require("joi");
const Question = db.Question;
const Op = db.Sequelize.Op;

const validateQuestion = (poll) => {
  const schema = Joi.object({
    question: Joi.string().min(3).required(),
    pollId: Joi.number().required(),
  });
  return schema.validate(poll);
};

routes.get("/:id", async (req, res) => {
  try {
    const poll = await Question.findAll({
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
  //validate the data is correct or not
  try {
    const { error } = validateQuestion(req.body);
    // console.log(error);
    if (error) return res.status(400).send(error.details[0].message);
    const question = {
      question: req.body.question,
      count: 0,
      pollId: req.body.pollId,
    };
    const question2 = await Question.create(question);
    res.send(question2);
  } catch (error) {
    //
    res.status(500).send("Internal Server Error" + error.message);
  }
});

routes.get("/poll/:pollId", async (req, res) => {
  try {
    const question = await Question.findAll({
      where: {
        pollId: req.params.pollId,
      },
      order: [["count", "DESC"]],
    });
   // const io = req.app.get("io");
   // io.emit("pollUpdated", question);
    res.send(question);
  } catch (error) {
    res.send(error.message);
  }
});

routes.put("/vote/:id", async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).send("Question not found");
    }

    question.count += 1;
    await question.save();
    
    const allQuestions = await Question.findAll({
      where: { pollId: question.pollId },
      order: [["count", "DESC"]],
    });
    
    // Emit to the specific poll room
    const io = req.app.get("io");
    const roomName = `poll:${question.pollId}`;
    io.to(roomName).emit("pollUpdated", allQuestions);
    
    res.send(question);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = routes;
// response error got synchronized
