const router = require("express").Router();
const { ensureAuth } = require("../../middlewares/auth");
const { addNewBill, getBillsCreatedByUserId } = require("./bills.service");

// GET /bills
// DESC Return all the bill split groups created by user
router.get("/", ensureAuth, async (req, res) => {
  try {
    getBillsCreatedByUserId(req.user.user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: 1,
        msg: "Successfully fetched your bill split groups!",
        results,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

// POST /bills/create
// DESC Create a new bill split group
router.post("/create", ensureAuth, async (req, res) => {
  try {
    const new_bill = {
      name: req.body.name,
      expense: req.body.expense,
      type: req.body.type,
      created_by: req.user.user_id,
      created_date: new Date().getTime(),
    };

    addNewBill(new_bill, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: 1,
        msg: "Successfully created new bill split group!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

module.exports = router;
