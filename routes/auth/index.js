const router = require("express").Router();

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { ensureAuth } = require("../../middlewares/auth");
const {
  getUserByEmail,
  createUser,
  updateUser,
  getUserById,
} = require("./auth.service");

// POST /signUp
// DESC Register a new user
router.post("/signUp", (req, res) => {
  // console.log(req.body);
  try {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    createUser(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "User registered. Go ahead and login!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// POST /signIn
// Authenticate a user
router.post("/signIn", (req, res) => {
  // console.log(req.body);
  try {
    getUserByEmail(req.body.email, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB Connection error",
        });
      }

      if (!result) {
        return res.status(404).json({
          success: 0,
          msg: "Invalid credentials",
        });
      }

      if (compareSync(req.body.password, result.password)) {
        delete result.password;

        const jwt = sign({ result }, process.env.JWT_KEY, {
          expiresIn: "3h",
        });

        return res.status(200).json({
          success: 1,
          msg: "Login successful",
          token: jwt,
        });
        // return res.render("dashboard", {
        //   user: result,
        //   token: jwt,
        // });
        // return res.redirect("/dashboard");
      } else {
        return res.status(404).json({
          success: 0,
          msg: "Invalid credentials",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// PATCH /user
// Update an user details
router.patch("/user/", ensureAuth, (req, res) => {
  // console.log(req.body);
  try {
    const user_id = req.params.user_id;

    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    updateUser(body, user_id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "Failed to update user",
        });
      }

      return res.status(200).json({
        success: 1,
        msg: "User updated",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

// GET /user
// Fetch user details
router.get("/user", ensureAuth, (req, res) => {
  try {
    getUserById(req.body.user_id || req.user.user_id, (err, result) => {
      if (err || !result) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "Failed to fetch user",
        });
      }

      delete result.password;
      return res.json({ success: 1, user: result });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
