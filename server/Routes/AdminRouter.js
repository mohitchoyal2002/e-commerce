import express from 'express'
import { checkUser, getOTP, googleAuth, login, logout, signup, updatePassword, verifyOtp } from '../controllers/Admin/admin.js'
import { deleteAdminToken, validateAdminToken } from '../controllers/JWT.js'
const adminRouter = express.Router()

adminRouter.post('/signup', signup)

adminRouter.post('/login', login)

adminRouter.post('/google-auth', googleAuth)

adminRouter.post('/get-otp', getOTP)

adminRouter.put('/verify-otp', verifyOtp)

adminRouter.put('/update-password', updatePassword)

adminRouter.get('/check-user', validateAdminToken, checkUser)

adminRouter.get('/logout', deleteAdminToken, validateAdminToken, logout)


export default adminRouter