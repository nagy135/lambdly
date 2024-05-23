import { IsString } from "class-validator";

export class Link {
	// LINK#hash
	declare PK: string;

	@IsString()
	userId: string;

	@IsString()
	url: string;
}
