import { Router } from "express";

import { authController } from "../controlers/auth.controler";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.validateBody(UserValidator.signIn),
    userMiddleware.isUserExist,
    userMiddleware.isBanned,
    authController.signIn,
);
router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.patch(
    "/activate",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.ACTIVATE_ACCOUNT),
    authController.activateAccount,
);

export const authRouter = router;
