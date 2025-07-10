import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/auth-utils.js";

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : undefined;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
