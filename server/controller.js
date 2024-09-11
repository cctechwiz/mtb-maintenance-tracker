import { User } from "../db/model.js";
import bcryptjs from 'bcryptjs';

export const handlerFunctions = {
  sessionCheck: async (req, res) => {

  },

  register: async (req, res) => {

  },

  login: async (req, res) => {
    const { email, password } = req.body;

    // Query db for user based on email from request body
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    // if 'user' is falsy (no user was found in db)
    if (!user) {
      return res.send({
        message: 'no user found',
        success: false
      });
    };

    // if hash of password from req.body does not match password hash from db
    if (!bcryptjs.compareSync(password, user.password)) {
      return res.send({
        message: 'password is incorrect',
        success: false
      });
    };

    // If user exists and password is correct, save user.id to session
    req.session.userId = user.id

    return res.send({
      message: 'user logged in',
      success: true,
      userId: user.id
    });
  },

  logout: async (req, res) => {

  }
}