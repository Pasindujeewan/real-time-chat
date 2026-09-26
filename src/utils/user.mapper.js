export const toUserResponse = (user) => ({
  id: user._id,
  userName: user.username,
});
