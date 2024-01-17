const dbconnection = require("../db/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;
  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await dbconnection.query(
      "INSERT INTO users (username, email, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)",
      [username, email, firstname, lastname, hashedPassword]
    );
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username,userid,password FROM users WHERE email=?",
      [email]
    );
    if (user.length === 0) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const userid = user[0].userid;
    const username = user[0].username;
    const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      msg: "user logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const checkUser = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  checkUser,
};
