/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser } = require('../db/users.js')

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    //check for existing user first
    try {
        const userExists = await getUserByUsername(username)
        if (userExists) {
            next({
                error: "Error registering",
                name: "UserExists",
                message: `User ${username} is already taken.`
            });
        }
        if (password.length < 8) {
            next({
                error: "Error registering",
                message: "Password Too Short!",
                name: "InvalidPassword"
            })
        } else {
        const newUser = await createUser(req.body);
        const token = jwt.sign(
          {
            id: newUser.id,
            username,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );
        
        res.send({
            message: "Registration successful!",
            token: token,
            user: {
                id: newUser.id,
                username: username
            }
        })
        }   
    } catch ({error, name, message}) {
        next({error, name, message})
    }
})

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
