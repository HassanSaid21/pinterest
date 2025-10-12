import pinModel from "../models/pin.model.js"


export const getPins =async (req, res , next )=>{
  const pageParam = req.query.cursor*1 || 0
  const LIMIT= 21
 const pins = await pinModel.find().limit(21).skip( LIMIT*pageParam )  
  const hasNextPage = pins.length === LIMIT

  return res.json({pins , nextCursor:hasNextPage ?pageNumber+1 : null})
}