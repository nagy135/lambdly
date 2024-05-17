import { IsString } from "class-validator";

export class CreateLinkRequestDto {
	@IsString()
	userId: string;

	@IsString()
	url: string;
}
