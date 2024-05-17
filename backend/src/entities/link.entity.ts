import { IsString } from "class-validator";

export class Link {
	// hash
	declare PK: string;

	// userId
	declare SK: string;

	@IsString()
	url: string;
}
