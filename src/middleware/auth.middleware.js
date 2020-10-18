import Cookies from "cookies";

export default (req, res, next) => {
  const cookie = new Cookies(req, res);

  const userId = cookie.get("userId");
  const username = cookie.get("username");

  if (!userId) {
    return res.status(401);
  }
  req.user = {
    userId,
    username,
  };

  next();
};
