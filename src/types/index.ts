import type { Prisma } from '@prisma/client';

export type AdditionalParamPaginatonType = {
	name: string;
	value: number;
};

export type PostType = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	authorId: number;
	enabled: number;
	content: string;
	isDraft:boolean;
	title: string;
	description: string;
	imageSrc: string;
	author: {
		username: string;
	};
	slug: string;
};
export type GroceryType = {
	username: string;
	id: number;
	updatedAt: Date;
	groceries: {
		id: number;
		title: string;
		vendorId: number;
		url: string;
		imageSrc: string;
		lastPrice: number;
		vendor: {
			title: string;
		};
		slug: string;
	}[];
	totalPages: number;
};
export type SearchResult = {
	title: string;
	table_name: string;
	imageSrc: string;
	slug: string;
};
export interface GroceryForProductType {
	id: number;
	postId: number;
	groceryId: number;
	neededQuantity: number;
	quantity: number;
	grocery:GroceriesForPostType
	
}
export interface GroceriesForPostType {
	id: number;
	title: string;
	imageSrc: string;
	name: string;
	groceryId: number;
	postId: number;
	quantity: number;
	quantityUnit: string;
	neededQuantity: number;
	neededQuantityUnit: string;
	lastPrice?: number | undefined;
}
export interface GroceriesAddPostType {
	content: GroceriesAddPostType;
	postGroceries:GroceriesForPostType[]
}
export type AccountCreationErrorType = {
	accountCreator: Prisma.UserCreateInput;
};

export type PostsWithGroceries = {
	username: string;
	draftContent: {
		totalPrice: number;
		id: string;
		title: string;
		createdAt: Date;
		updatedAt: Date;
		authorId: number;
		slug: string;
		imageSrc: string;
		description: string;
		enabled: number;
		content: Prisma.JsonValue;
		postGroceries: GroceriesForPostType;
	};
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
