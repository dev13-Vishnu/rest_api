const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const users = await User.find({});
  return res.status(200).json(users);
}

const handleGetUserById = async (req, res) => {
  // const id = Number(req.params.id);
  // const user = users.find((user)=> user.id ===id);

  const user = await User.findById(req.params.id);

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed user not found", id: req.params.id });
  }
  return res.status(200).json({ Status: "Success", user });
};

const handleUpdateUserById = async (req, res) => {
  // const id = Number(req.params.id);
  const body = req.body;

  // let user = users.find(user=> user.id===id);

  // if(!user) {
  //     return res.status(404).json({status:"failed user not found",id: id})
  // }
  // // console.log("user:",user);
  // // console.log("body:",body)
  // Object.assign(user,{...user,...body})

  // // console.log(users.find(user=> user.id ===id))

  // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=> {
  await User.findByIdAndUpdate(req.params.id, body);
  return res.status(200).json({ status: "Success", id: req.params.id });
  // })
};

const handleDeleteUserById = async (req, res) => {
  // const id = Number(req.params.id);
  // let user = users.find(user=> user.id===id);
  // if(!user) {
  //     return res.status(404).json({status:"failed user not found",id: id})
  // }

  // let newUsers = users.filter(user=> user.id !== id);

  // fs.writeFile("./MOCK_DATA.json",JSON.stringify(newUsers),(err,data)=> {
  //     return res.json({status: "success",id:id})
  // })
  const result = await User.findByIdAndDelete(req.params.id);
  // console.log("delete result:",result);
  if (!result) {
    return res.status(404).json({ msg: "user not found" });
  }
  return res.status(200).json({ status: "Success" });
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  // console.log("body:",body)

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // users.push({id:users.length + 1,...body});
  // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=> {
  //     return res.status(201).json({Status: "Success",id:users.length})
  // })

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  console.log("result: ", result);
  return res.status(201).json({ msg: "Success" });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
