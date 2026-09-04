import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";

export default async function optionalAuth(req, res, next){
  const auth = req.headers.authorization;
  if(!auth || !auth.startsWith("Bearer")){
    return next();
  }

  try{
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id);
    req.user = user;
  }catch{

  }
  next();
}