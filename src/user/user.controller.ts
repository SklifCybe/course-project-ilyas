import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    Patch,
    Post,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@ApiTags('HTTP Server Methods')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: User, isArray: true })
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: User })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ type: User })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: User })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: User })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.remove(id);
    }
}
