import { IsOptional, IsString } from "class-validator";

export class GetDashboardRequestDto {
	@IsString()
	@IsOptional()
	userId: string;
}
