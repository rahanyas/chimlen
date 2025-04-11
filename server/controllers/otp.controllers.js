

export const getotp =  (req, res) => {
  const {email} = req.body;
  console.log(email);
  if(email){
    return res.status(200).json({msg : 'email recieved'})
  }
}