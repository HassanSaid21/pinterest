import pinModel from "../models/pin.model.js"


export const getPins =async (req, res , next )=>{

  const pageParam = req.query.cursor*1 || 0
  const LIMIT= 21
  const total = await pinModel.countDocuments()
 const pins = await pinModel.find().limit(LIMIT).skip( LIMIT*pageParam )  
  const hasNextPage = pins.length === LIMIT

  return res.json({pins , nextCursor:hasNextPage ?pageParam+1 : null , total})
}

export const deletePins = async (req , res, next)=>{
  await pinModel.deleteMany({ index: { $gte: 50, $lte: 100 } });

return res.json('pins deleted successfully')
}