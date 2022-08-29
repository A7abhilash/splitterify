const pool = require("../../config/db");
const shortid = require("shortid");

module.exports = {
  addNewBillGroup: (data = [], callback) => {
    let sql = `insert into user_groups(txn_id, bill_id, user_id, guestName, owes_to, expense, paid_date, status) values`;
    data.forEach((item, index) => {
      const txn_id = shortid.generate();
      sql += `(
        "${txn_id}",
        "${item.bill_id}",
        "${item.user_id}",
        "${item.guestName}",
        "${item.owes_to}",
        "${item.expense}",
        NULL,
        "PENDING"
	    )`;

      if (index !== data.length - 1) {
        sql += ", ";
      }
    });

    pool.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }

      return callback(err, results);
    });
  },

  updateBillPayment: (txn_id, callback) => {
    let paid_date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    const sql = `update user_groups set paid_date="${paid_date}", status="PAID" where txn_id="${txn_id}"`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result[0]);
    });
  },

  getBillGroupOfBillIdAndUserId: (txn_id, callback) => {
    const sql = `select * from user_groups where txn_id="${txn_id}"`;
    pool.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }

      return callback(err, results[0]);
    });
  },

  getBillGroupsOfUserId: (user_id, callback) => {
    const sql = `select B.bill_id, B.name, B.expense as total_expense, B.created_date, B.created_by, U1.user_id, U1.userName, U1.phoneNo, U1.email, U2.user_id as owner_user_id, U2.userName as owner_userName, U2.phoneNo as owner_phoneNo, U2.email as owner_email, UG.txn_id, UG.status, UG.paid_date, UG.owes_to, UG.expense as amount_to_pay
					from user_groups UG
					join users U1 
					on UG.user_id=U1.user_id and UG.user_id="${user_id}"
					join users U2 on UG.owes_to=U2.user_id 
					join bills B
					on UG.bill_id=B.bill_id
  				`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result);
    });
  },

  getBillMembersByBillId: (bill_id, callback) => {
    const sql = `select B.bill_id, B.name, B.expense as total_expense, B.created_date, B.created_by, U1.user_id, U1.userName, U1.phoneNo, U1.email, U2.user_id as owner_user_id, U2.userName as owner_userName, U2.phoneNo as owner_phoneNo, U2.email as owner_email, UG.txn_id, UG.status, UG.paid_date, UG.owes_to, UG.expense as amount_to_pay
				from user_groups UG
				join users U1 
				on UG.user_id=U1.user_id
				join users U2 on UG.owes_to=U2.user_id 
				join bills B
				on UG.bill_id=B.bill_id and UG.bill_id="${bill_id}"
  			`;
    pool.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(err, result);
    });
  },
};
