import { IsString } from "class-validator";

export class Link {
	@IsString()
	url: string;

	@IsString()
	hash: string;
}

