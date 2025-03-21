import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPayload } from "../interfaces/token.interface";

class UserMiddleware {
    public async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;

            if (role !== RoleEnum.ADMIN) {
                throw new ApiError(
                    "This action just for admins",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const userMiddleware = new UserMiddleware();
