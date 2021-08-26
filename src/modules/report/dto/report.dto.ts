import {
    IsNotEmpty,
    IsString,
    IsArray
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateReportDTO {
    // Name
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Sample Report',
        description: 'Name',
        format: 'string'
    })
    name: string;

}

export class UpdateReportDTO extends PartialType(CreateReportDTO) { }



