import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
 // const token = req.headers.authorization?.split(" ")[1];
 const token = req.cookies.token

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
