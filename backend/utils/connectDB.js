
import  mongoose from "mongoose";

const connectDB = async ()=>{
  try {

  await mongoose.connect(process.env.MONGO)
    console.log('mongodb is connected');
  }

  catch(err){
    console.log('MONGODB connection err' , err);
  }
}

export default connectDB