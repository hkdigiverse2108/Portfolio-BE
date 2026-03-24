export const responseMessage = {
  loginSuccess: "Login successful!",
  signupSuccess: "Account created successful!",
  internalServerError: "Internal Server Error!",
  accessDenied: "Access denied",
  invalidToken: "Invalid token",
  tokenExpire: "Token has been expired!",
  accountBlock: "Your account has been blocked!",
  differentToken: "Do not try a different token!",
  tokenNotFound: "We can't find tokens in header!",
  addDataError: "Oops! Something went wrong!",
  invalidUserPasswordEmail: "You have entered an invalid username or password!",

  dataAlreadyExist: (message: string): string => `Please change ${message}, ${message} is already exists!`,
} as const;
