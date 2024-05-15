import { IsString } from "class-validator";

export const PRIMARY_KEY = "id";

export class Link {
	declare [PRIMARY_KEY]: string;

	@IsString()
	url: string;

	@IsString()
	hash: string;
}

