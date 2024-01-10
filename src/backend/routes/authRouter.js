const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const authVerify = require("../middlewares/auth.middleware");
const authRouter = express.Router();

const SECREAT = "ASHUTOSH BIRTHARE TODO";


async function signupHandler(newUserDetails) {
  const emailOfUser = newUserDetails.email;
  const password = newUserDetails.password;

  const token = jwt.sign({ userId: emailOfUser }, SECREAT, {
    expiresIn: "24h",
  });

  const userExits = await userModel.findOne({ email: emailOfUser });
  if (userExits) {
    console.log("the email is already exists in databse");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email: newUserDetails.email,
      password: hashedPassword,
      firstName: newUserDetails.firstName,
      lastName: newUserDetails.lastName,
    };

    const updateUser = new userModel(newUser);
    const saveUser = await updateUser.save();
    console.log("save");
    return { saveUser, token };
  }
}

authRouter.post("/signup", async (req, res) => {
  const newUserDetail = req.body;
  console.log(newUserDetail);
  try {
    const { saveUser, token } = await signupHandler(newUserDetail);
    res.status(201).json({ success: "new user created", saveUser, token });
  } catch (error) {
    res.json("user already exists");
  }
});

async function loginHandler(usersDetail) {
  const emailOfUser = usersDetail.email;
  const password = usersDetail.password;
  console.log(usersDetail);

  try {
    const user = await userModel.findOne({ email: emailOfUser });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        return { user };
      } else {
        console.log("password is not correct");
      }
    } else {
      console.log("user not available");
    }
  } catch (error) {
    console.log("this user not register in our database");
  }
}

authRouter.post("/login", authVerify, async (req, res) => {
  const userDetail = req.body;
  const { decodeId } = req.user;

  try {
    if (decodeId === userDetail.email) {
      const { user } = await loginHandler(userDetail);

      res.status(200).json({ success: true, userData: user });
    }
  } catch (error) {
    res.status(400).json({ msg: "user is not available in our database" });
  }
});



authRouter.get("/delete",async(req,res)=>{
  await userModel.deleteMany();
  res.json({delete: "success"})
})

module.exports = authRouter;
