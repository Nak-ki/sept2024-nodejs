import { NextFunction, Request, Response } from "express";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.errors";
import { IRefresh } from "../interfaces/token.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const accessToken = authorizationHeader.split("Bearer ")[1];

            if (!accessToken) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const tokenPayload = tokenService.verifyToken(
                accessToken,
                TokenTypeEnum.ACCESS,
            );
            const isTokenExists = await tokenService.isTokenExists(
                accessToken,
                TokenTypeEnum.ACCESS,
            );

            if (!isTokenExists) {
                throw new ApiError(
                    "Invalid token",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;

            if (!refreshToken) {
                throw new ApiError(
                    "No refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );
            const isTokenExists = await tokenService.isTokenExists(
                refreshToken,
                TokenTypeEnum.REFRESH,
            );

            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodesEnum.FORBIDDEN);
            }

            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkActionToken(type: ActionTokenTypeEnum, key = "token") {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const actionToken = req.query[key] as string;
                if (!actionToken) {
                    throw new ApiError("No token provided", 400);
                }
                const payload = tokenService.checkActionToken(
                    actionToken,
                    type,
                );
                const entity =
                    await actionTokenRepository.getByToken(actionToken);
                if (!entity) {
                    throw new ApiError("Invalid token", 401);
                }
                req.res.locals.jwtPayload = payload;
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const authMiddleware = new AuthMiddleware();
