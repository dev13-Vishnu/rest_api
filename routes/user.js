const express = require("express");
// const User = require("../models/user");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

// REST

// router.get("/api/users/:id",(req,res)=> {

//     const id = Number(req.params.id)
//     const user = users.find(user=> user.id === id)

//     return    res.json(user)
// })

// router.post("/api/users", (req,res)=> {
//     return res.json("Status: Pending");
// })

// router.patch("/api/users/:id", (req,res)=> {
//     return res.json("Status: Pending");
// })

// router.delete("/api/users/:id", (req,res)=> {
//     return res.json("Status: Pending");
// })

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
