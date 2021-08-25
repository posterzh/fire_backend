import {
    IsNotEmpty,
    IsString,
    IsArray
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export enum InspectionCategory {
    FIRE_ALARM = 'Fire Alarm',
    SPRINKLER = 'Sprinkler',
    EXTINGUISHER = 'Extinguisher',
    EMERGENCY = 'Emergency'
}

export class CreateInspectionDTO {
    // Name
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Fire Alarm Inspection',
        description: 'Name',
        format: 'string'
    })
    name: string;

    // Category
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: InspectionCategory.FIRE_ALARM,
        description: 'Category',
        enum: InspectionCategory
    })
    category: InspectionCategory;
}

export class UpdateInspectionDTO extends PartialType(CreateInspectionDTO) { }

export class ArrayIdDTO {
    // Delete multiple ID or Clone Multiple Id
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: ['5f699e87b92fbe5320a35a93', '5f699e8bb92fbe5320a35a94'],
        description: 'Id',
        format: 'array'
    })
    id: string[];
}

