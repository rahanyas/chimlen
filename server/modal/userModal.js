import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName : {
    type : String,
    required : true,
  },
  email : {
     type : String,
     unique : true,
     required : true,
     validate : {
      validator : (value) => {
        return /^\S+@\S+\.\S+$/.test(value)
      },
      message : 'Invalid email'
     }
  },
  mobile : {
     type : Number,
     required : true,
     unique : true,
     validate : {
      validator : (value) => /^[6-9]\d{9}$/.test(value),
      message : "invalid mobile number"
     }
  },
  password : {
    type : String,
    required : true
  },
  profilePic : {
    type : String
  },
  active : {
    type : Boolean,
    default : true
  }
}, {timestamps : true});



const User = mongoose.model("User", userSchema);

export default User;