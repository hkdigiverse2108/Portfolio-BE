import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class apiResponse {
  private status: number | null;
  private message: string | null;
  private data: any | null;
  private error: any | null;
  constructor(status: number, message: string, data: any, error: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

export const generateHash = async (password = "") => {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = bcryptjs.hash(password, salt);
  return hashPassword;
};

const jwtSecretKey = process.env.JWT_TOKEN_SECRET;

export const generateToken = async (data = {}, expiresIn = {}) => {
  const token = jwt.sign(data, jwtSecretKey, expiresIn);
  return token;
};
