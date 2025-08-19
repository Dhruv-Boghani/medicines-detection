const express = require('express');
const { generateToken, verifyToken } = require('../../utils/jwt.js');
const { hashPassword, comparePassword } = require('../../utils/hash.js');
const generateOTP = require('../../controllers/createOTP.controllers.js');
const pool = require('../../connections/DB.connect.js');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const DBres = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);

        if (DBres.rows.length === 0) {
            return res.status(404).send('Wrong email ID');
        }

        if (!DBres.rows[0].is_verified) {
            return res.status(400).send('User not verified');
        }

        const isPasswordCorrect = await comparePassword(password, DBres.rows[0].password_hash);

        if (!isPasswordCorrect) {
            return res.status(400).send('Wrong password');
        }

        console.log(DBres.rows[0]);

        const data = {
            id: DBres.rows[0].id,
            name: DBres.rows[0].name,
        };

        const token = generateToken(data);

        res
            .status(200)
            .cookie('login_token', token)
            .json({ login_token: token, data });

    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;