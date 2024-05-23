import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { Link } from "../../entities/link.entity";

export class CreateDashboardRequestDto {
	@IsString()
	userId: string;

	@IsString()
	url: string;

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(25)
	@Type(() => Link)
	links: Link[];
}
