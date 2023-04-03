import { compare, hash } from "bcrypt";
import userModel from "../models/user.js";
import { capitalizeWords, seperateName } from "./basicOperations.js";
import { createUserToken } from "./JWT.js";
import otpGenrator from "otp-generator";
import { sendMail } from "./sendMail.js";

export const userLogin = async (req, res) => {
  const user = req.body;
  try {
    const isUser = await userModel.findOne({ email: user.email });
    if (isUser) {
      const valid = await compare(user.password, isUser.password);
      if (valid) {
        const token = createUserToken({
          firstName: isUser.firstName,
          lastName: isUser.lastName,
          email: isUser.email,
          gender: isUser.gender,
        });
        res.cookie("user_token", token);
        res.json({
          firstName: isUser.firstName,
          lastName: isUser.lastName,
          email: isUser.email,
          gender: isUser.gender
        });
      } else {
        res.status(400).json("Invalid Credentials");
      }
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const userSignup = async (req, res) => {
  const password = await hash(req.body.password, 10);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;
  const gender = req.body.gender;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.status(400).json("user Already registered");
    } else {
      const newUser = new userModel({
        firstName,
        lastName,
        email,
        phoneNo,
        password,
        isAdmin: false,
        gender,
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    }
  } catch (err) {
    // console.log();
    res.status(500).json("An Error Occured");
  }
};

export const googleAuth = async (req, res) => {
  const user = req.body;
  console.log(user);
  const name = seperateName(user.user.displayName);
  const email = user.user.email;
  try {
    const password = await hash("googleAuth", 10);
    const isUser = await userModel.findOne({ email });
    if (isUser) {
      const valid = await compare("googleAuth", isUser.password);
      if (valid) {
        const token = createUserToken({
          firstName: name[0],
          lastName: name[1],
          email: email,
        });
        res.cookie("user_token", token);
        res.json({ firstName: name[0], lastName: name[1], email: email });
      } else {
        res.status(400).json("Try to Login in Manually");
      }
    } else {
      const newUser = new userModel({
        user,
        firstName: name[0],
        lastName: name[1],
        email,
        password,
      });
      const savedUser = await newUser.save();

      res.json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went Wrong");
  }
};

export const checkUser = (req, res) => {
  res.json(req.body.token);
};

export const logoutUser = (req, res) => {
  res.json("logout");
};

export const getOTP = async (req, res) => {
  const { email, name } = req.body;
  const capName = capitalizeWords(name);
  const user = await userModel.findOne({ email, name: capName });
  try {
    if (!user) {
      res.status(400).json("User not Found !");
    } else {
      const otp = otpGenrator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
      });
      user.otp = otp;
      await user.save();
      console.log("sent");
      sendMail(email, otp);
      res.json("OTP Sent");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went Wrong");
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const filledOtp = parseInt(otp);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json("User Not Found!");
    } else {
      if (filledOtp === user.otp) {
        res.json("Verified");
      } else {
        res.status(400).json("Wrong OTP");
      }
    }
  } catch (err) {
    res.status(500).json("Something went Wrong");
  }
};

export const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const encryptedPass = await hash(password, 10);
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json("User Not Found!");
    } else {
      user.password = encryptedPass;
      await user.save();
      res.json("password Changed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something Went Wrong");
  }
};

export const changeUserInfo = async (req, res) => {
  const { email, newFirstName, newLastName, newGender } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json("User Not Found!");
    } else {
      user.firstName = newFirstName;
      user.lastName = newLastName;
      user.gender = newGender;

      await user.save();
      const token = createUserToken({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
      });
      res.cookie("user_token", token);
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender
      });

      // res.json("Info Updated");
    }
  } catch (err) {
    res.status(500).json("Somthing Went Wrong");
  }
};

export const changeUserMail = async (req, res) => {
  const { currEmail, newEmail } = req.body;

  try {
    const user = await userModel.findOne({ email: currEmail });
    if (!user) {
      res.status(400).json("User Not Found!");
    } else {
      user.email = newEmail;
      await user.save();

      const token = createUserToken({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
      });
      res.cookie("user_token", token);
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender
      });

      // res.json("Info Updated");
    }
  } catch (err) {
    res.status(500).json("Somthing Went Wrong");
  }
};

export const changePhone = async(req, res)=>{
  const {email, phoneNo} = req.body;
  
  try{
    const user = await userModel.findOne({email})
    if(!user){
      res.status(400).json("User Not Found")
    }
    else{
      user.phoneNo = phoneNo;
      await user.save()
      const token = createUserToken({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
      })

      res.cookie("user_token", token);

      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender
      });

    }
  }
  catch(err){
    console.log(err);
    res.status(500).json("Something went Wrong")
  }
}

export const getInfo = async (req, res) => {
  const email = req.params.email;
  // console.log();

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json("USer Not Found");
    } else {
      res.json({
        email: user.email,
        phone: user.phoneNo,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
      });
      // createUserToken()
    }
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
};


export const updateAddress = async(req, res)=>{
  const {city, state, address, pincode, landmark, locality, email} = req.body

  try{
    const user = await userModel.findOne({email})
    if(!user){
      res.status(400).json("User Not Found")
    }
    else{
      user.city = city
      user.state = state;
      user.pincode = pincode
      user.locality = locality
      user.address = address
      user.landmark = landmark 
      await user.save()
      res.json("Address Updated")
    }
  }
  catch(err){
    res.status(500).json("Something went wrong")
  }
}