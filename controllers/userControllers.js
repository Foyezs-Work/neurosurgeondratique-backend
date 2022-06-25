const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


//@description     Register new user
//@route           POST /api/user/
//@access          Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
        res.status(400);
        throw new Error("You have already an account!");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
            message: "You have been successfully creating a new account"

        });
    } else {
        res.status(400);
        throw new Error("Failed to create new user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
})

module.exports = { registerUser, authUser }