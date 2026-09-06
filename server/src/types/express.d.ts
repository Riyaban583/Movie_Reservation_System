import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
   interface Request {
  user?: JwtPayload & {
    userId: string;
    name: string;
    email: string;
    role: string;
  };
}
  }
}

export {};