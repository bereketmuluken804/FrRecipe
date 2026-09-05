import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import User from "../models/User.js";


export default async function authMiddleware(req, res, next) {
	const auth = req.headers.authorization
	if (!(auth && auth?.startsWith("Bearer"))) {
		return res.status(401).json({
			message: "Unauthorized: missing authorization header",
		});
	}
	try {
		const token = auth.split(" ")[1];
		const decoded = jwt.verify(token, JWT_SECRET);
    
		const user = await User.findById(decoded.id );
		
    if (!user.id) {
      return res.status(401).json({
        message: "Unauthorized: invalid token",
			});
		}
		req.user = user;		
		next()
	} catch (err) {
		next(err);
	}
}

