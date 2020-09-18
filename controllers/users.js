const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res, next) => {
    try {
        const allUser = await User.find({});
        return res.status(200).json(allUser);
    } catch (err) {
        next(err)
    }
});

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const hashedPassword = await bcrypt.hash(body.userPassword, 10);
        const newUser = new User({
            userName: body.userName,
            name: body.name,
            hashedPassword,
        });
        const result = await newUser.save();
        return res.status(201).json(result);
    } catch (err) {
        next(err)
    }
})

module.exports = userRouter;