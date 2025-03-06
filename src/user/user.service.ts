import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { JWT_SECRET } from "@app/config";
import { UserResponseInterface } from "@app/user/types/userResponse.interface";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return this.userRepository.save(newUser);
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