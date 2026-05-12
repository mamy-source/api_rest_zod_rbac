import { registerUser, loginUser, getProfile } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    try {
        const {name, email, password, role} = req.body;
        const user = await registerUser(name, email, password, role);
        res.status(201).json({message: "User registered successfully", user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await loginUser(email, password);

        // Set the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Return the access token and user info in the response
        res.status(200).json({
            message: "User logged in successfully",
            user: result.user,
            accessToken: result.accessToken,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getProfile(userId);
        res.status(200).json({message: "User profile", user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const accessToken = jwt.sign(
      {
        id: decoded.id,
        role: decoded.role
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
      }
    );

    return res.status(200).json({
      accessToken
    });

  } catch (error) {
    next(error);
  }
};