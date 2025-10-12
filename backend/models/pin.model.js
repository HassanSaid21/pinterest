import mongoose ,{Schema} from "mongoose";

const pinSchema = new mongoose.Schema({
   media :{
    type :String   ,
    required :true 
   }  ,
   width: {
    type :Number   ,
    required :true 
   }  ,
   height:{
    type :  Number   ,
    required :true 
   }  ,
   title:{
    required: true ,
    type :String ,
   } ,
   description:{
    type :String   ,
    required :true 
   }  , 
  link:{
    type :String   ,
    required :true 
   }  , 
   board:{
      type :Schema.Types.ObjectId   ,
       ref :'Board' ,
   }  ,
    tags
    :{
    type :[String]   ,
    
   }  ,
   user:{
    type :Schema.Types.ObjectId   ,
    ref :'User' ,
    required :true
   }  ,
}, 
    {
timestamps :  true 
} )


export default  mongoose.model('Pin' , pinSchema)