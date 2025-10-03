import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsUrl,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRaceDistanceDto } from './create-race-distance.dto';

export class CreateRaceDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  // image: Buffer; // handle in controller (file upload)

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsUrl()
  website: string;

  @IsString()
  @IsNotEmpty()
  startLocation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRaceDistanceDto)
  raceDistances: CreateRaceDistanceDto[];
}
