import User from "../models/User.js"
import { createError } from "./../utils/error.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })
    await newUser.save()
    res.status(200).send("User added successfully")
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, "User not found"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(400, "wrong password or username"))
    // encode data that is going to be saved in the cookie
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )
    const { password, isAdmin, ...otheUserDetails } = user._doc
    // save data in a cookie
    res
      .cookie("access_token", token, {
        httpOnly: true, // this cookie can't be written or read from client side
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
      })
      .status(200)
      .send({ details: otheUserDetails, isAdmin })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res) => {
  try {
    res
      .cookie(
        "access_token",
        "", // modifying the cookie expiry date to now
        {
          httpOnly: true,
          expires: new Date(0), // 0 miliseconds (now)
        }
      )
      .status(200)
      .json({ message: "successfully logged out" })
  } catch (error) {
    next(error)
  }
}
