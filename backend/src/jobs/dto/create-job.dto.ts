import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(50)
  company: string;

  @IsString()
  @MaxLength(100)
  location: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'])
  type?: string;

  @IsOptional()
  @IsEnum(['Active', 'Closed', 'Draft'])
  status?: string;
}
