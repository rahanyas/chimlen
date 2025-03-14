import User from "../modal/userModal.js";


export const handleSignup = async (req, res) => {
  try {
    const { user } = req.body;
    const {userName, email, mobile, password} = user
    const Newuser = await User.signup(userName,email,mobile, password)

    const token = user.generateToken();
    console.log(token);

    console.log(user);
   return res.status(200).json('got the body')
  } catch (error) {
    return res.status(400).json({error : error.message})
  }

}