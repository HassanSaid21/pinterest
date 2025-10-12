  import {hash} from 'bcryptjs'
  import User from '../models/user.model.js'
  export const getUsers = (req, res , next )=>{
    return res.json('users')
  }



  export const create = async (req, res , next )=>{
    const userInformation = req.body
    console.log(userInformation);

  await  User.create({
      displayName:req.body.displayName ,
      username:req.body.username ,
      email:req.body.email ,
      hashedPassword: await hash(req.body.password , 12) ,
    })
    return res.json('user created')
  }