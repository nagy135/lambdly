import { IsString } from "class-validator";

export class Link {
	declare PK: string;

	@IsString()
	url: string;

	@IsString()
	hash: string;
}

