const jwt = require("jsonwebtoken");
const Config = require("./../config/config.js");
const verifyTokenMiddleware = (req, res, next) => {

  const authHeader = req.header('authorization');
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token de acceso no proporcionado" });
  }
  const token = authHeader;

  try {
    //si no verifica salta una excepcion


    //const decoded = verifyToken(token,jwtConfig.JWT_SECRET);
    const decoded = jwt.verify(token, Config.secreteWord);
    //guardar en el usuario que se verificó ok


    req.user = decoded;


    next();
  } catch (error) {
    if (error instanceof Error)
      res.status(401).json({ message: error.message });
  }
};
module.exports = {
  verifyTokenMiddleware
}