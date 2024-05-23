import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Link } from "./link.entity";



export class Dashboard {
	// DASHBOARD#userId
	declare PK: string;

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(25)
	@Type(() => Link)
	links: Link[];
}
