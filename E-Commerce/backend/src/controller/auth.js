import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user)
      return res.status(400).send({
        message: "User already registered!",
      });

    const { _id, firstName, lastName, email, password } = req.body;
    const _user = new User({
      _id,
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).send({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).send({
          message: "User created Successfully",
        });
      }
    });
  });
};

export const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error) {
      return res.status(400).send({
        error,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { firstName, lastName, email, role, fullName } = user;
        res.status(200).send({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).send({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).send({
        message: "Something went wrong!!!",
      });
    }
  });
};

export const requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
