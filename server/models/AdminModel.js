import mongoose from 'mongoose'

const adminModel = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phoneNo:{
    type: String,
  },
  password:{
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    default: true
  },
  otp:{
    type: Number,
  },
  products:[
    {
      id:{
        type: Number,
        required: true,
      },
      title:{
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      discription:{
        type: String,
        required: true
      },
      category:{
        type: String,
        required: true
      },
      image:{
        type: String,
        data: Buffer,
        contentType: String
      },
      rating:{
        rate:{
          type: Number,
        },
        count:{
          type: Number
        }
      }
    }
  ]
})

export default mongoose.model('admin', adminModel)