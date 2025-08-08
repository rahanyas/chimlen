import jwt from 'jsonwebtoken'

export const generateToken =  (userId, res) => {
  try {
    console.log("generateToken function called with userId:", userId);
    if(!userId){
      console.log('Error : UserId is undefined in generateTokne');
      return;
    }
    const token = jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : '2d'});

    res.cookie("token", token, {
       httpOnly : true,
       secure : process.env.NODE_ENV !== 'development' ? true : false,
       sameSite : process.env.NODE_ENV !== 'development' ?"None" : "Lax",
       maxAge : 2 * 24 * 60 * 60 * 1000
    });
     console.log('token set in cookies : ', token)
    return token;
  } catch (err) {
    console.log('error in generateToken : ',err);
    return res.status(400).json({msg : 'Token generation failed'})
  }

};


