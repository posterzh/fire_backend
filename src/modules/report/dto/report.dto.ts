import {
    IsNotEmpty,
    IsString,
    IsArray
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class CreateReportDTO {
    // name
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Sample Report',
        description: 'Name',
        format: 'string'
    })
    name: string;

    // inspection_slug
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'fire-alarm-inspection',
        description: 'Inspection Slug',
        format: 'string',
        required: true
    })
    inspection_slug: string;

    // description
    @IsString()
    @ApiProperty({
        example: '',
        description: 'Description',
        format: 'string'
    })
    description: string;
}

export class UpdateReportDTO extends PartialType(OmitType(CreateReportDTO, ['inspection_slug'])) { }

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


