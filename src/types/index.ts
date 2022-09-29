import type { Prisma } from '@prisma/client';
export type AdditionalParamPaginatonType = {
	index:number,
	name:string,
	value:number
}
export interface GroceriesForPostType {
	groceryId: number;
	postId: number;
	quantity: number;
	quantityUnit: string;
	neededQuantity: number;
	neededQuantityUnit: string;
}

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
	[vendorId: number]: VendorBrandingSrc;
};
