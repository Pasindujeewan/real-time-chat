import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/Convercation.js";

export const createConversation = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const userId = req.user.id;

    const { participantId } = req.body;
    console.log("participantId", participantId);

    if (!userId) {
      throw new ApiError("userId required", 401, "USERID_REQUIRED");
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    });

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
    next(error);
  }
};
