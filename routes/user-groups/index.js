const router = require("express").Router();
const { ensureAuth } = require("../../middlewares/auth");
const {
  addNewBillGroup,
  getBillGroupsOfUserId,
  getBillMembersByBillId,
} = require("./user-groups.service");

// GET /user_groups/groups_of_user
// DESC Return all the bill split groups belonging to the user
router.get("/groups_of_user", ensureAuth, async (req, res) => {
  try {
    getBillGroupsOfUserId(req.user.user_id, (err, results) => {
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

// GET /user_groups/:bill_id
// DESC Return all the members of a bill split groups
router.get("/:bill_id", ensureAuth, async (req, res) => {
  try {
    getBillMembersByBillId(req.params.bill_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: 1,
        msg: "Successfully fetched the members of this bill split groups!",
        results,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

// POST /user_groups/create
// DESC Create a new bill split group
router.post("/create", ensureAuth, async (req, res) => {
  try {
    addNewBillGroup(req.body.groups, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: 1,
        msg: "Successfully added members to bill split group!",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: 0 });
  }
});

module.exports = router;
