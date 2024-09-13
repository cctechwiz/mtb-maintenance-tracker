import { User } from "../db/model.js";
import bcryptjs from 'bcryptjs';

export const authFuncs = {
  sessionCheck: async (req, res) => {
    if (req.session.userId) {
      return res.send({
        message: 'User is still logged in',
        success: true,
        userId: req.session.userId
      })
    } else {
      return res.send({
        message: 'No user is logged in',
        success: false,
      })
    }
  },

  register: async (req, res) => {
    const { email, password, name } = req.body;
    console.log()
    console.log(`req.body:`, req.body)
    console.log()

    // Check if email already exists in db
    let user = await User.findOne({
      where: {
        email
      }
    });

    // if email already exists in db:
    if (user) {
      return res.send({
        message: 'Email is already taken',
        success: false
      });
    };

    const passwordHash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

    // If email hasn't already been taken, add new user to db
    await User.create({
      email,
      password: passwordHash,
      name
    });

    // Check if user was added to db
    user = await User.findOne({
      where: {
        email
      }
    });

    // If no user is found:
    if (!user) {
      return res.send({
        message: 'Registration failed',
        success: false
      });
    };

    // If user was registered successfully:
    return res.send({
      message: 'User registered successfully',
      success: true,
      userId: user.id
    })
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
        message: 'User with that email was not found',
        success: false
      });
    };

    // if hash of password from req.body does not match password hash from db
    if (!bcryptjs.compareSync(password, user.password)) {
      return res.send({
        message: 'Password is incorrect',
        success: false
      });
    };

    // If user exists and password is correct, save user.id to session
    req.session.userId = user.id

    return res.send({
      message: 'User logged in successfully',
      success: true,
      userId: user.id
    });
  },

  logout: async (req, res) => {
    req.session.destroy();

    return res.send({
      message: 'User logged out successfully',
      success: true
    })
  }
}