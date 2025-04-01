import jwt from 'jsonwebtoken'

const generateToken =  (userId, res) => {
  try {
    const token = jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : '2d'});

    res.cookie("token", token, {
       httpOnly : true,
       secure : process.env.NODE_ENV !== "development",
       sameSite : "None",
       maxAge : 2 * 24 * 60 * 60 * 1000
    });

    return token;
  } catch (err) {
    console.log('error in generateToken : ',err);
    return res.status(400).json({msg : 'Token generation failed'})
  }

};

export default generateToken;