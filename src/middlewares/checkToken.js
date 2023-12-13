import jwt from "jsonwebtoken";
const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(".")[1];

  if (!token) {
    console.log(authHeader);
    console.log(token);
    return res.status(401).json({ message: "Acesso Negado!" });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default checkToken;
