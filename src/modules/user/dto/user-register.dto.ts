import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString, IsPhoneNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDTO {
    // Name
    @ApiProperty({
        example: 'New User',
        description: 'User name',
        format: 'string'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    // Email
    @ApiProperty({
        example: 'brianwaller0963@gmail.com',
        description: 'Email',
        format: 'email',
        uniqueItems: true
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    // Phone Number
    @ApiProperty({
        example: '085771461509',
        description: 'Phone Number',
        format: 'string',
        minLength: 6
    })
    @IsNotEmpty()
    @IsPhoneNumber('ID')
    @MinLength(10)
    @MaxLength(13)
    phone_number: string;

    // Password
    @ApiProperty({
        example: 'changeme',
        description: 'Password',
        format: 'string',
        minLength: 6
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    role: [string];

    // favorite topic
    @ApiProperty({
        example: [],
        description: 'Topic ID',
        format: 'array string',
    })
    favorite_topics: [string]
}
