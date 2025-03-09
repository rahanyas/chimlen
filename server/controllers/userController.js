import User from "../modal/userModal.js";


export const handleSignup = async (req, res) => {
  try {
    const { userName, Email, mobile, pass } = req.body;
    const user = await User.signup(userName, Email, mobile, pass)

    const token = user.generateToken();
    console.log(token);

    console.log(user);
   return res.status(200).json('got the body')
  } catch (error) {
    return res.status(400).json({error : error.message})
  }

}