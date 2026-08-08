import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async profile(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
  });
}

async me(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
}

async adminOnly(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
}

}

