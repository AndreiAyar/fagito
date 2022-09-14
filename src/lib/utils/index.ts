import type { TokenTypes } from "$root/types";
import jwt from "jsonwebtoken";

export const generateTokens = (data:Record<string, unknown>):TokenTypes =>{
	const secret = process.env.JWT_SECRET || ''
	const token = jwt.sign(data, secret, {expiresIn: '10s' })
	const refreshToken = jwt.sign(data, secret, {expiresIn: '30d' })
	
	return {
		token,
		refreshToken
	}
}