import type { Prisma } from '@prisma/client';

export type AccountCreationErrorType = {
	accountCreator: Prisma.UserCreateInput;
};

export type TokenTypes ={
	token:string
	refreshToken:string
}