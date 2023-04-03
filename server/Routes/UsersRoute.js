import express from 'express'
import { deleteToken, validateUserToken } from '../controllers/JWT.js'
import { changePhone, changeUserInfo, changeUserMail, checkUser, getInfo, getOTP, googleAuth, logoutUser, updateAddress, updatePassword, userLogin, userSignup, verifyOtp } from '../controllers/users.js'

const UserRouter = express.Router()

UserRouter.post('/login', userLogin)

UserRouter.post('/signup', userSignup)

UserRouter.post('/google-auth', googleAuth)

UserRouter.get('/check-user', validateUserToken, checkUser)

UserRouter.get('/logout', deleteToken, validateUserToken, logoutUser)

UserRouter.post('/get-otp', getOTP)

UserRouter.put('/verify-otp', verifyOtp)

UserRouter.put('/change-password', updatePassword)

UserRouter.put('/change-personal-info', validateUserToken, changeUserInfo)

UserRouter.put('/change-user-mail', validateUserToken, changeUserMail)

UserRouter.put('/change-phone', validateUserToken, changePhone)

UserRouter.get('/get-info/:email', getInfo)

UserRouter.put("/update-address", updateAddress)

export default UserRouter