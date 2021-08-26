import {
    IsNotEmpty,
    IsString,
    IsArray
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { QuestionType } from "../interfaces/report.interface";

export class CreateQuestionDTO {
    // name
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Sample Question',
        description: 'Name',
        format: 'string'
    })
    name: string;

    // type
    @IsString()
    @ApiProperty({
        example: QuestionType.HEAD,
        description: 'Type',
        enum: QuestionType
    })
    type: string;

    // answer
    @IsString()
    @ApiProperty({
        description: 'Answer',
        format: 'string'
    })
    answer: string;

    // deficiencyCode
    @IsString()
    @ApiProperty({
        description: 'Deficiency Code',
        format: 'string'
    })
    deficiencyCode: string;

    // customCode
    @IsString()
    @ApiProperty({
        description: 'Custom Code',
        format: 'string'
    })
    customCode: string;

    // label1
    @IsString()
    @ApiProperty({
        description: 'Label1',
        format: 'string'
    })
    label1: string;

    // text1
    @IsString()
    @ApiProperty({
        description: 'Text1',
        format: 'string'
    })
    text1: string;

    // label2
    @IsString()
    @ApiProperty({
        description: 'Label2',
        format: 'string'
    })
    label2: string;

    // text2
    @IsString()
    @ApiProperty({
        description: 'Text2',
        format: 'string'
    })
    text2: string;

    // label3
    @IsString()
    @ApiProperty({
        description: 'Label3',
        format: 'string'
    })
    label3: string;

    // text3
    @IsString()
    @ApiProperty({
        description: 'Text3',
        format: 'string'
    })
    text3: string;

    // tooltip
    @IsString()
    @ApiProperty({
        description: 'Tooltip',
        format: 'string'
    })
    tooltip: string;

    // has_exception
    @IsString()
    @ApiProperty({
        description: 'Has Exception?',
        format: 'string'
    })
    has_exception: string;

    // exception
    @IsString()
    @ApiProperty({
        description: 'Exception',
        format: 'string'
    })
    exception: string;
}

export class UpdateQuestionDTO extends PartialType(CreateQuestionDTO) { }



