import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/User.js";
import { toUserResponse } from "../utils/user.mapper.js";

// this controller help find users before start chat
export const searchUser = async (req, res, next) => {
  try {
    const { search } = req.query;
    if (!search?.trim()) {
      res
        .status(200)
        .json(new ApiResponse(200, [], "User Fetched Successfuly"));
    }

    const result = await User.find({
      username: { $regex: search, $options: "i" },
    }).lean();

    const users = result.map(toUserResponse);

    res
      .status(200)
      .json(new ApiResponse(200, users, "User Fetched Successfuly"));
  } catch (e) {
    console.log(e);
    next(e);
  }
};
