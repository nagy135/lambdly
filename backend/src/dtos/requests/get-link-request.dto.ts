import { IsString } from "class-validator";

export class GetLinkRequestDto {
	@IsString()
	hash: string;
}
