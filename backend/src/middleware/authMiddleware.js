const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized access." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Forbidden. Admins only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
