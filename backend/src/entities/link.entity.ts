import { IsString } from "class-validator";

export class Link {
	// hash
	declare PK: string;

	@IsString()
	userId: string;

	@IsString()
	url: string;
}
