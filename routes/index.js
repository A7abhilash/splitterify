const router = require("express").Router();
const pool = require("../config/db");

// GET /
router.get("/", (req, res) => {
  return res.json({ msg: "Hello World!" });
});

// create database url_shortener
router.get("/create-database", (req, res) => {
  try {
    const sql = "create database splitterify";
    pool.query(sql, (err, result) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New database 'splitterify' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

// create table users
router.get("/create-table/users", (req, res) => {
  try {
    const sql = `create table users (
		user_id VARCHAR(45) PRIMARY KEY,
		userName VARCHAR(100),
    phoneNo INT(10),
		email VARCHAR(45) UNIQUE NOT NULL,
		password VARCHAR(100)
		)`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New table 'splitterify.users' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

// create table bills
router.get("/create-table/bills", (req, res) => {
  try {
    const sql = `create table bills (
		bill_id VARCHAR(45) PRIMARY KEY,
    name VARCHAR(45),
    type VARCHAR(45),
    expense INT(10),
		created_by VARCHAR(45) NOT NULL,
		created_date DATE,
		FOREIGN KEY (created_by) REFERENCES users(user_id)
		)`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New table 'splitterify.bills' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

// create table user_groups
router.get("/create-table/user_groups", (req, res) => {
  try {
    const sql = `create table user_groups (
    txn_id VARCHAR(45) PRIMARY KEY,
		bill_id VARCHAR(45),
    user_id VARCHAR(45),
    guestName VARCHAR(200),
    owes_to VARCHAR(45),
    expense INT(10),
		paid_date DATE,
    status VARCHAR(45),
		FOREIGN KEY (bill_id) REFERENCES bills(bill_id),
		FOREIGN KEY (user_id) REFERENCES users(user_id),
		FOREIGN KEY (owes_to) REFERENCES users(user_id)
		)`;
    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        msg: "New table 'splitterify.user_groups' created!!!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: 0, msg: "Server error" });
  }
});

module.exports = router;
