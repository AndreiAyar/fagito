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
interface IObjectKeys {
	[key: string]: number | string,
  }
 
export const getAvailableDomains = (url:string):string | number | null=>{
 
	const availableURLs:IObjectKeys = {
		'www.mega-image.ro':'Mega-Image',
		'www.auchan.ro':'Auchan'
	}
   return url ? availableURLs[url] : url
} 
