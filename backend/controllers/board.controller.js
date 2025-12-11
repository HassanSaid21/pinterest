import boardModal from  '../models/board.model.js'
import pinModel from '../models/pin.model.js';

export const getUserBoards = async (req, res, next) => {
  const { userId } = req.params;

  const boards = await boardModal.find({ user: userId });
   
  if (!boards.length) {
    return res.json({boards:[]});
  }

  const userBoards = await Promise.all(
    boards.map(async (board) => {
      const pinsNumber = await pinModel.countDocuments({ board: board._id });
      const pin = await pinModel.findOne({ board: board._id });

      return {
        ...board.toObject(),
        pinsNumber,
        pin
      };
    })
  );

  return res.json({boards:userBoards});
};
