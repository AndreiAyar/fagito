
export const validateEmail = (email: string): boolean => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

export const uuidToBase64 = (uuid:string) => {
	return Buffer.from(uuid.replace(/-/g, ""), "hex").toString("base64url");
  }
  
