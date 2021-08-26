import {
    IsNotEmpty,
    IsString,
    IsArray
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateSectionDTO {
    // Name
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Sample Section',
        description: 'Name',
        format: 'string'
    })
    name: string;

}

export class UpdateSectionDTO extends PartialType(CreateSectionDTO) { }



