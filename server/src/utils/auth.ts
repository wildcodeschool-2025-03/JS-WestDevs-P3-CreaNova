import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign(payload, secretKey);

    res
      .status(200)
      .json({ message: "Congratulations, you're logged in !", token });
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { hashedPassword, login };
