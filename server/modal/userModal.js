import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  active : {
    type : Boolean,
    default : true
  }
}, {timestamps : true});

userSchema.methods.generateToken = function (){
  return jwt.sign(
   { userId : this._id },
   process.env.JWT_SECRET,
   {expiresIn : '2d'}
  );
}

userSchema.statics.signup = async function (
  userName, 
  email,
  mobile,
  password
){
   try {
      
    if(!userName || !email || !mobile || !password){
       throw new Error("all feild are required");
    };

    const existingUser = await this.findOne({email});
    if(existingUser){
      throw new Error("user already registerd")
    }

    const existingMobile = await this.findOne({mobile});
    if(existingMobile){
      throw new Error("Mobile number already registerd")
    }
       const salt = await bcrypt.genSalt(10);
       const hashedPass = await bcrypt.hash(password, salt);

       const user = await this.create({
        userName, 
        email,
        mobile,
        password : hashedPass
       })

       const token = user.generateToken()

       return {user, token};

   } catch (err) {
     throw new Error(err.message)
   }
}

const User = mongoose.model("User", userSchema);

export default User;