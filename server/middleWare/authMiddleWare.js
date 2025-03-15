import jwt from 'jsonwebtoken'

const verifytoken = (req, res, next) => {
  const token = res.cookies.token;
 if(!token){
  return res.status(400).json({msg : 'not authenticated'})
 }
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next()
   } catch (err) {
    return res.status(401).json({error : 'invalid or expired token'})
   }
};

export default verifytoken;