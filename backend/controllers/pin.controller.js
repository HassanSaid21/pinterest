// import Like from "../models/like.model.js";
// import Save from "../models/save.model.js";
import Board from "../models/board.model.js";
import pinModel from "../models/pin.model.js";
import sharp from "sharp";
import Imagekit from "imagekit";
import likeModel from "../models/like.model.js";
import saveModel from "../models/save.model.js";
import jwt from "jsonwebtoken";


export const getPins = async (req, res, next) => {
  const LIMIT = 21;
  const pageParam = Number(req.query.cursor) || 0;
  const { userId, search, boardId } = req.query;

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
        : userId
        ? { user: userId }
        : boardId
        ? { board: boardId }
        : {}
    )
    .limit(LIMIT)
    .skip(LIMIT * pageParam);

  const hasNextPage = pins.length === LIMIT;

  return res.json({ pins, nextCursor: hasNextPage ? pageParam + 1 : null });
};

/****************************************************** */
export const getPin = async (req, res, next) => {
  const { id } = req.params;
  const pin = await pinModel
    .findById(id)
    .populate("user", "img displayName username");

  res.json(pin ? pin : null);
};
/****************************************************** */

export const createPin = async (req, res) => {
  const {
    title,
    description,
    link,
    board,
    tags,
    textOptions,
    canvasOptions,
    newBoard,
  } = req.body;

  const media = req.files.media;

  if ((!title, !description, !media)) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedTextOptions = JSON.parse(textOptions || "{}");
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    clientAspectRatio =
      parsedCanvasOptions.size.split(":")[0] /
      parsedCanvasOptions.size.split(":")[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metadata.width;
  height = metadata.width / clientAspectRatio;

  const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
  const textTopPosition = Math.round(
    (parsedTextOptions.top * height) / parsedCanvasOptions.height
  );

  // const transformationString = `w-${width},h-${height}${
  //   originalAspectRatio > clientAspectRatio ? ",cm-pad_resize" : ""
  // },bg-${parsedCanvasOptions.backgroundColor.substring(1)}${
  //   parsedTextOptions.text
  //     ? `,l-text,i-${parsedTextOptions.text},fs-${
  //         parsedTextOptions.fontSize * 2.1
  //       },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
  //         1
  //       )},l-end`
  //     : ""
  // }`;

  // FIXED TRANSFORMATION STRING

  let croppingStrategy = "";

  if (parsedCanvasOptions.size !== "original") {
    if (originalAspectRatio > clientAspectRatio) {
      croppingStrategy = ",cm-pad_resize";
    }
  } else {
    if (
      originalOrientation === "landscape" &&
      parsedCanvasOptions.orientation === "portrait"
    ) {
      croppingStrategy = ",cm-pad_resize";
    }
  }

  const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(
    1
  )}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          parsedTextOptions.fontSize * 2.1
        },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
          1
        )},l-end`
      : ""
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "test",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      // FIXED: ADD NEW BOARD
      let newBoardId;

      if (newBoard) {
        const res = await Board.create({
          title: newBoard,
          user: req.userId,
        });
        newBoardId = res._id;
      }

      const newPin = await pinModel.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: newBoardId || board || null,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });
      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

/*************************************************************** */
export const deletePins = async (req, res, next) => {
  await pinModel.deleteMany({ index: { $gte: 28, $lte: 100 } });
  const count = await pinModel.countDocuments();

  return res.json(`pins deleted successfully , new pins length is ${count}`);
};

export const interactionCheck = async (req, res, next) => {
  const { id } = req.params;
  const token = req.cookies.token;
  const likeCount = await likeModel.countDocuments({ pin: id });
  if (!token)
    return res
      .status(200)
      .json({ isLiked: false, isSaved: false, likeCount: likeCount });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    //if the token is expired or invalid
    if (err)
      return res
        .status(200)
        .json({ isLiked: false, isSaved: false, likeCount: likeCount });
    const userId = decoded.userId;
    const likeInteraction = await likeModel.findOne({
      pin: id,
      user: userId,
    });
    const saveInteraction = await saveModel.findOne({
      pin: id,
      user: userId,
    });
    return res
      .status(200)
      .json({
        isLiked: likeInteraction ? true : false,
        isSaved: saveInteraction ? true : false,
        likeCount: likeCount,
      });
  });
};



/***************************************************************/

export const interact = async (req, res) => {
  const { id } = req.params;

  const { type } = req.body;

  if (type === "like") {
    const isLiked = await likeModel.findOne({
      pin: id,
      user: req.userId,
    });

    if (isLiked) {
      await likeModel.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await likeModel.create({
        pin: id,
        user: req.userId,
      });
    }
  } else {
    const isSaved = await   saveModel.findOne({
      pin: id,
      user: req.userId,
    });

    if (isSaved) {
      await   saveModel.deleteOne({
        pin: id,
        user: req.userId,
      });
    } else {
      await saveModel.create({
        pin: id,
        user: req.userId,
      });
    }
  }

  return res.status(200).json({ message: "Successful" });
};
