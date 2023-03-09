import express from 'express'
import { getOTP, googleAuth, login, signup, updatePassword, verifyOtp } from '../controllers/Admin/admin.js'
const adminRouter = express.Router()

adminRouter.post('/signup', signup)

adminRouter.post('/login', login)

adminRouter.post('/google-auth', googleAuth)

adminRouter.post('/get-otp', getOTP)

adminRouter.put('/verify-otp', verifyOtp)

adminRouter.put('/update-password', updatePassword)

export default adminRouter