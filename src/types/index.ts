import type { Prisma } from '@prisma/client';

export type AccountCreationErrorType = {
	accountCreator: Prisma.UserCreateInput;
};

export type TokenTypes = {
	token: string;
	refreshToken: string;
};

export type ParserType = {
	time?: number | undefined;
	blocks: Array<{ key: string }>;
	version: string;
};

type VendorBrandingSrc = {
	imagePath: string;
};

export type VendorBrandingType = {
	[vendorId:number]: VendorBrandingSrc;
};
