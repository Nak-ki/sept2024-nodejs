import { Router } from "express";

import { upload } from "../configs/multer.config";
import { userController } from "../controlers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddleware.isIdValidate("id"), userController.getById);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    userController.deleteById,
);
router.patch(
    "/:id/banned",
    authMiddleware.checkAccessToken,
    userMiddleware.isAdmin,
    commonMiddleware.isIdValidate("id"),
    userController.banned,
);

router.patch(
    "/upload-avatar/:id",
    authMiddleware.checkAccessToken,
    upload.single("avatar"),
    commonMiddleware.isFileExist(),
    userController.uploadAvatar,
);

export const userRouter = router;
