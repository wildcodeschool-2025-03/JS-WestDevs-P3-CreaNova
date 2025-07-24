import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import userRepository from "../modules/user/userRepository";

const hashedPassword: RequestHandler = async (req, res, next) => {
  const hash = await argon2.hash(req.body.password);

  req.body.password = hash;
  next();
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.readByEmail(email);

    if (!user) {
      throw new Error("This user doesn't exist");
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.is_admin,
    };

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("A secret key must be provided");
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    res.cookie("token", token, {
      httpOnly: true,
      // Rend l'envoie du cookie possible. En déploiement, il est important de  mettre secure à true.
      secure: false,
    });
    res.status(200).json(payload);
  } catch (err) {
    res.sendStatus(500);
  }
};

const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

const refreshToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("A token must be provided");
    }
    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("A secret key must be provided");
    }

    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      const payload = decoded as JwtPayload;
      const newToken = jwt.sign({ id: payload.id }, secretKey, {
        expiresIn: "1d",
      });

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: false,
      });
      res.status(200).json(payload);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.error((err as Error).message);
    res.sendStatus(500);
  }
};
const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }
    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      res.status(500).json({ error: "A secret key must be provided" });
      return;
    }

    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    req.body.user_account_id = decoded.id;
    // Des modifications vont être nécessaires,
    // j'ai une PR déjà en cours.
    // La ligne 108 sera supprimé.
    // (id étant déjà dispo ligne 112)
    req.user = {
      id: decoded.id,
      is_admin: decoded.isAdmin,
      email: decoded.email,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
export default {
  hashedPassword,
  login,
  logout,
  refreshToken,
  authenticateUser,
};
