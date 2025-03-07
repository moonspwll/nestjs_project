import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { RequestExpress } from "@app/types/requestExpress.interface";
import { JWT_SECRET } from "@app/config";
import { UserService } from "@app/user/user.service";
import { UserEntity } from "../user.entity";

@Injectable()

export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(req: RequestExpress, res: Response, next: NextFunction) {
        console.log('Request...');
        if (!req.headers.authorization) {
            req.user = null;
            next();
            return;
        }

        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = verify(token, JWT_SECRET);
            // console.log('decoded', decoded);
            req.user = await this.userService.findById(decoded.id);
        } catch (e) {
            req.user = null;
        }

        next();
    }
}