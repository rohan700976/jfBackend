const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const User = require('../routes/schema/User');
const router = express.Router();


const SECRET_KEY = "jhsduvsukcvuvsakuv";


router.post('/create', async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({ error: "email already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const users = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role

        });

        const token = jwt.sign(
            { userId: users._id },
            SECRET_KEY,
            { expiresIn: "3d" }
        );

        res.status(201).json({
            message: "Signup successful",
            token: token,
            userId: users._id,

        });

    } catch (error) {
        res.status(400).json({ error: "error" });
    }

})


router.get('/getAll/users', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json({
            deletedUser,
            delete: "user delete succesfully"
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})


router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const findEmail = await User.findOne({ email });



    if (!findEmail) {
        return res.json({ error: "invalid email" }).status(400);
    }

    const isMatch = await bcrypt.compare(password, findEmail.password);
    if (!isMatch) {
        res.json({ error: "inavalid password" }).status(400);
    }

    const token = jwt.sign(
        { userId: findEmail._id },
        SECRET_KEY,
        { expiresIn: "3d" }
    );

    res.json({
        message: "Login successful",
        token
    });

})

module.exports = router;