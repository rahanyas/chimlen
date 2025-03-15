import jwt from 'jsonwebtoken'

const generateToken =  (userId, res) => {
     const token = jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : '2d'});

     res.cookie('token', token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "lax",
        maxAge : 2 * 24 * 60 * 60 * 1000
     });

     return token;
};

export default generateToken;