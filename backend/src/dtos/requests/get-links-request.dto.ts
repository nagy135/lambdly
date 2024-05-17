import { IsOptional, IsString } from "class-validator";

export class GetLinksRequestDto {
	@IsString()
	@IsOptional()
	userId: string;
}
