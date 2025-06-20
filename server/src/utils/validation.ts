import type { RequestHandler } from "express";

const userValidation: RequestHandler = (req, res, next) => {
  try {
    const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const { firstname, lastname, email, password } = req.body;
    const isEmailValid = email.match(mailRegex);
    const isPasswordValid = password.match(passwordRegex);

    if (!email || !password || !firstname || !lastname) {
      res.status(400).json("Fields are empty");
    } else if (!isEmailValid) {
      res.status(400).json("Invalid email");
    } else if (!isPasswordValid) {
      res
        .status(400)
        .json(
          "Invalid password, min eight characters, at least one letter and one number",
        );
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { userValidation };
