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
      validator : (value) =>  /^\S+@\S+\.\S+$/.test(value),
      message : 'Invalid email'
     }
  },
  mobile : {
     type : Number,
     unique : true,
     sparse : true,
     validate : {
      validator : (value) => /^[6-9]\d{9}$/.test(value),
      message : "invalid mobile number"
     }
  },
  password : {
    type : String,
  },
  profilePic : {
    type : String
  },
  googleId : {
   type : String,
   unique : true,
   sparse : true,
  },
  provider : {
    type : String,
    required : true,
    enum : ['local', 'google']
  },
  active : {
    type : Boolean,
    default : true
  }
}, {timestamps : true});



const User = mongoose.model("User", userSchema);

export default User;