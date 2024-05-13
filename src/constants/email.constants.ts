export enum EEmailActions {
  WELCOME,
  FORGOT_PASSWORD,
  OLD_VISITOR,
}

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "register",
    subject: "Welcome to our significant app",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Do not worry, your password is under control",
  },
  [EEmailActions.OLD_VISITOR]: {
    templateName: "old-visitor",
    subject: "We haven't seen each other for a long time.",
  },
};
