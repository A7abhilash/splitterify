const pool = require("../../config/db");
const shortid = require("shortid");

module.exports = {
  createUser: (data, callback) => {
    const short_id = shortid.generate();
    const sql = `insert into users (user_id, userName, phoneNo, email, password) values (?,?,?,?,?)`;
    pool.query(
      sql,
      [short_id, data.userName, data.phoneNo, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  updateUser: (data, user_id, callback) => {
    const sql = `update users set userName=?, phoneNo=?, vpa=?, email=?, password=? where user_id="${user_id}"`;
    pool.query(
      sql,
      [data.userName, data.phoneNo, data.vpa, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getUserById: (user_id, callback) => {
    const sql = `select user_id, userName, email, phoneNo, password from users where user_id="${user_id}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  getUserByEmail: (email, callback) => {
    const sql = `select user_id, userName, email, phoneNo, password from users where email="${email}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  searchUserByUserName: (name, callback) => {
    const sql = `select user_id, userName, email, phoneNo from users where userName LIKE "%${name}%"`;
    pool.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }

      return callback(err, results);
    });
  },
};
