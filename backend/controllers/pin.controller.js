import pinModel from "../models/pin.model.js";

export const getPins = async (req, res, next) => {
  const LIMIT = 21;
  const pageParam = Number(req.query.cursor) || 0;
  const search = req.query.search;

  const pins = await pinModel
    .find(
      search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search } },
              { tags: { $in: [search] } },
            ],
          }
        : {}
    )
    .limit(LIMIT)
    .skip(LIMIT * pageParam);

  const hasNextPage = pins.length === LIMIT;
  setTimeout(() => console.log("wait"), 3000);

  return res.json({ pins, nextCursor: hasNextPage ? pageParam + 1 : null });
};

export const  getPin = async(req, res, next)=>{
  const id = req.params.id
  const pin = await pinModel.findById(id)
  res.json(pin?pin:'no such pin exist')

}


export const deletePins = async (req, res, next) => {
  await pinModel.deleteMany({ index: { $gte: 50, $lte: 100 } });

  return res.json("pins deleted successfully");
};
