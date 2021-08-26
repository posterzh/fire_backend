import {
  IsNotEmpty,
  IsString,
  IsArray
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTemplateDTO {
  // name
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Sample Template',
    description: 'Name',
    format: 'string'
  })
  name: string;

  // inspection_id
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6126aab6d3e302a0592c5abb',
    description: 'Inspection ID',
    format: 'string',
    required: true
  })
  inspection_id: string;
}

export class UpdateTemplateDTO extends PartialType(CreateTemplateDTO) { }

