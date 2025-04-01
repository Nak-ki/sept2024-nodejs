import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstants = {
    [EmailTypeEnum.WELCOME]: {
        subject: "Welcome to our platform",
        template: "welcome",
    },
};
