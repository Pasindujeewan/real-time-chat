import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/Convercation.js";
import { Message } from "../models/Message.js";

export const createConversation = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { participantId } = req.body;
    console.log("participantId", participantId);

    if (!userId) {
      throw new ApiError("userId required", 401, "USERID_REQUIRED");
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    }).lean();

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, participantId],
      });
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { conversation },
          "Conversation is start Sucessfully ",
        ),
      );
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const participantId = req.query.participantId;

    // find convercation id
    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, participantId],
      },
    });
    //get messages
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res
      .status(200)
      .json(new ApiResponse(200, messages, "fetched messages succesfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
