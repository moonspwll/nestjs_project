import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { RequestExpress } from '@app/types/requestExpress.interface';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    async currentUser(@Request() request: RequestExpress): Promise<UserResponseInterface> {
        const user: any = request.user;
        return this.userService.buildUserResponse(user);
    }

}