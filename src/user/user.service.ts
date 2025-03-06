import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { JWT_SECRET } from "@app/config";
import { UserResponseInterface } from "@app/user/types/userResponse.interface";
import { LoginUserDto } from "@app/user/dto/loginUser.dto";
import { compare } from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({ where: { email: createUserDto.email }});
        const userByUsername = await this.userRepository.findOne({ where: { username: createUserDto.username }});

        if (userByEmail || userByUsername) {
            throw new HttpException('Email or username is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return this.userRepository.save(newUser);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email: loginUserDto.email }, 
            select: ['id', 'email', 'username', 'bio', 'password']
        });

        if (!user) {
            throw new HttpException('No user with that credentials', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const passwordIsCorrect = await compare(loginUserDto.password, user.password);

        if (!passwordIsCorrect) {
            throw new HttpException('Credentials are invalid', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        delete user.password;
        return user;
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            username: user.username,
        }, JWT_SECRET);
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user),
            }
        };
    }

}