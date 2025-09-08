// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

/**
 * Read JWT from:
 *  - Authorization: Bearer <token>
 *  - header: admin_token
 *  - cookie: admin_token
 */
function getToken(req) {
  const auth = req.headers.authorization || req.headers.Authorization || "";
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7).trim();
  if (req.headers["admin_token"])
    return String(req.headers["admin_token"]).trim();
  if (req.cookies?.admin_token) return String(req.cookies.admin_token).trim();
  return "";
}

function verifyToken(req, res, next) {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const secret = process.env.JWT_SECRET || "dev_secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // should contain at least { id, role } or roles[]
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

/**
 * Allow if:
 *  - req.user.role is in allowed roles
 *  - OR req.user.roles (array) contains one of the allowed roles
 *  - Common admin roles: admin, staff, superadmin, owner
 */
function requireRoles(...allowed) {
  const normalized = allowed.length
    ? allowed
    : ["admin", "staff", "superadmin", "owner"];
  return (req, res, next) => {
    const role = req.user?.role;
    const roles = Array.isArray(req.user?.roles) ? req.user.roles : [];
    const ok =
      (role && normalized.includes(String(role).toLowerCase())) ||
      roles
        .map((r) => String(r).toLowerCase())
        .some((r) => normalized.includes(r));
    if (!ok) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}
const verifyTokenAndRole = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });

    const allowedRoles = ["admin", "manager", "vendor", "cashier", "teller"];
    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Not authorized for this action" });
    }

    req.user = user;
    next();
  });
};

module.exports = { verifyToken, requireRoles, verifyTokenAndRole };
