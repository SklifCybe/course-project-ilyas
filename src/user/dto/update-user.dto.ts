import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsAlpha, Length } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PickType(User, [
    'firstName',
    'lastName',
] as const) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @Length(2, 12)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @Length(2, 12)
    lastName: string;
}
