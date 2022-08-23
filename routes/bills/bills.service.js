const pool = require("../../config/db");
const shortid = require("shortid");

module.exports = {
  addNewBill: (data, callback) => {
    const bill_id = shortid.generate();
    let created_date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    const sql = `insert into bills values("${bill_id}",
					  "${data.name}",
					  "${data.type}",
					  "${data.expense}",
					  "${data.created_by}",
					  "${created_date}"
				  )`;

    pool.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }

      return callback(err, { ...results, bill_id });
    });
  },

  // updateUrlVisitCount: (short_id, count, callback) => {
  //   const sql = `update urls set visits=${count} where short_id="${short_id}"`;
  //   pool.query(sql, () => callback());
  // },

  // updateShortUrl: (short_id, new_short_id, callback) => {
  //   const sql = `update urls set short_id="${new_short_id}" where short_id="${short_id}"`;
  //   pool.query(sql, (err, result) => {
  // 	if (err) {
  // 	  return callback(err);
  // 	}

  // 	return callback(err, result[0]);
  //   });
  // },

  getBillDetailsByBillId: (bill_id, callback) => {
    const sql = `select B.bill_id, B.name, B.expense, B.created_date, B.created_by, U.user_id, U.userName, U.phoneNo, U.email
				from bills B
				join users U
				on B.created_by = U.user_id and B.bill_id = "${bill_id}"
				`;
    pool.query(sql, (err, results) => {
      console.log(results);
      if (err) {
        return callback(err);
      }

      return callback(err, results[0]);
    });
  },

  getBillsCreatedByUserId: (user_id, callback) => {
    const sql = `select B.bill_id, B.name, B.expense, B.created_date, B.created_by, U.user_id, U.userName, U.phoneNo, U.email
				from bills B
				join users U
				on B.created_by = U.user_id and U.user_id = "${user_id}"
				`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result);
    });
  },
};
