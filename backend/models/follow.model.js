import mongoose from 'mongoose'
 
const followSchema = new mongoose.Schema({
   follower:{
    ref:'User',
    type: mongoose.Types.ObjectId ,
    required :true , 

   } ,
   following:{
    ref:'User',
    type: mongoose.Types.ObjectId ,
    required :true , 
    
   }
} , {timestamps :true})

export default mongoose.model('Follow' ,followSchema)