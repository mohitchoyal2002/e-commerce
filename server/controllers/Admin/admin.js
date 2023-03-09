import adminModel from '../../models/AdminModel.js'
import {compare, hash} from 'bcrypt'
import { createAdminToken } from '../JWT.js';
import { sendMail } from '../sendMail.js';
import {capitalizeWords} from '../basicOperations.js'
import otpGenrator from 'otp-generator'

export const signup = async(req, res)=>{
  const {name, email, password, phoneNo, shopName} = req.body
  try{
    const user = await adminModel.findOne({email});
    if(user){
      res.status(400).json("User Already Exists")
    }
    else{
      const encryptedPassword = await hash(password, 10)
      try{
        const newAdmin = new adminModel({name, email, password: encryptedPassword, phoneNo, shopName});
        const savedAdmin = await newAdmin.save()
        res.json(savedAdmin)
      }
      catch(err){
        console.log(err);
        res.status(500).json('Cannot create Seller, Please Try again later')
      }
    }
  }
  catch(err){
    res.status(500).json('Something went Wrong')
  }

}

export const login = async(req, res)=>{
  const {email, password} = req.body
  try{
    const user = await adminModel.findOne({email: email})
    if(!user){
      res.status(400).json("Invalid Credentials")
    }
    else{
      const valid = await compare(password, user.password)
      if(!valid){
        res.status(400).json("Invalid Credentials")
      }
      else{
        const token = createAdminToken({email: user.email, name: user.name, phoneNo: user.phoneNo, isAdmin: true})
        res.cookie('admin_token', token)
        res.json({email: user.email, name: user.name, phoneNo: user.phoneNo, shopName: user.shopName, products: user.products})
      }
    }
  }
  catch(err){
    res.status(500).json("Something went Wrong")
  }
}

export const googleAuth = async(req, res)=>{
  const user = req.body
  const name = user.user.displayName
  const email = user.user.email
  try{
    const password = await hash('googleAdminAuth', 10)
    const isUser = await adminModel.findOne({email})
    if(isUser){
      const valid = await compare('googleAdminAuth', isUser.password)
      if(valid){
        const token = createAdminToken({email: isUser.email, name: isUser.name, phoneNo: isUser.phoneNo, isAdmin: true})
        res.cookie('admin_token', token)
        res.json({msg:"loggedIn",user:{name: name, email: email, phoneNo: isUser.phoneNo,shopName: isUser.shopName, products: isUser.products}})
      }
      else{
        res.status(400).json("Try to Login in Manually")
      }
    }
    else{
      res.json({msg:"navigate",user:{name: name, email: email}})
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json("Something went Wrong")
  }
}

export const getOTP = async(req, res)=>{
  const {email, name} = req.body
  const capName = capitalizeWords(name)  
  const user = await adminModel.findOne({email, name: capName})
  try{
    if(!user){
      res.status(400).json("Email not Found !")
    }
    else{
      const otp = otpGenrator.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false})
      user.otp = otp;
      await user.save();
      console.log('sent');
      sendMail(email, otp)
      res.json("OTP Sent")
    }
  }
  catch(err){
    res.status(500).json("Something went Wrong")
  }
}

export const verifyOtp = async(req, res)=>{
  const {email, otp} = req.body
  const filledOtp = parseInt(otp)

  try{
    const user = await adminModel.findOne({email})
    if(!user){
      res.status(400).json("User Not Found!")
    }
    else{
      if(filledOtp === user.otp){
        res.json("Verified")
      }
      else{
        res.status(400).json("Wrong OTP")
      }
    }
  }
  catch(err){
    res.status(500).json("Something went Wrong")
  }
}

export const updatePassword = async(req, res)=>{
  const {email, password} = req.body
  try{
    const user = await adminModel.findOne({email})
    if(!user){
      res.status(400).json("User Not Found")
    }
    else{
      const enPass = await hash(password, 10)
      user.password = enPass
      await user.save()
      res.json("Password Changed")
    }
  }
  catch(err){
    res.status(500).json("Somthing Went Wrong")
  }
}