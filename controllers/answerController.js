const dbconnection = require("../db/dbconfig");

const getAnswers = async (req, res) => {
  try {
    const [answers] = await dbconnection.query(
      "SELECT answerid,answer.userid, answer, createdAt, users.username FROM answer INNER JOIN users ON answer.userid = users.userid WHERE questionid = ? ORDER BY createdAt DESC",
      [req.params.questionid]
    );
    res.json(answers);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createAnswer = async (req, res) => {
  const { answer } = req.body;
  // console.log(answer);
  const userid = req.user.userid;
  const questionid = req.params.questionid;
  // console.log(questionid);
  if (!answer) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    await dbconnection.query(
      "INSERT INTO answer (answer, userid, questionid) VALUES (?, ?, ?)",
      [answer, userid, questionid]
    );
    await dbconnection.query(
      "UPDATE questions SET comment_count = (SELECT COUNT(*) FROM answer WHERE questionid = ?) WHERE questionid = ?",
      [questionid, questionid]
    );
    res.status(201).json({ msg: "Answer created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAnswers,
  createAnswer,
};
