const jwt = require("jsonwebtoken");
const pool = require("../connections/DB.connect.js");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.login_token;

    if (!token) {
      return res
        .status(410)
        .json({ message: "Login required. Token not found." });
    }

    // Decode token
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const userId = data.id;

    // Find user in DB
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user data to req
    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error("Login check error:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = isLoggedIn;
