
import jwt from "jsonwebtoken";
import pool from '../db/postgres.js';
import { customAlphabet } from "nanoid";
const gen = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 7)
const salt = "cloude@beast#OS";
async function Token(user) {
    const payload = {
        email: user.email,
        userId: user.userid
    }
    return jwt.sign(payload, salt);
}
async function handleSignIn(req, res) {
    console.log("login requested..")
    const body = req.body;
    const { email, password } = body;
    //validation 
    if (!email || !password) {
        return res.status(400).json({ success: false, reply: "missing fields" });
    }

    //verify >>
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`, [email]
    );
    const userExist = result.rows[0];
    console.log(userExist);
    //send profile themes here.
    if (!userExist) { return res.status(404).json({ success: false, reply: "user Not registers", tokenSent: null }) }
    // user exist : 
    if (password !== userExist.password) {
        return res.status(400).json({ success: false, reply: "wrong password", tokenSent: null });
    }
    console.log("verifying user ... +++")
    const token = await Token(userExist);
    const userInfo = {
        email: userExist.email,
        profile: userExist.profile
    }
    console.log(`token generated`)
    res.cookie("token", token,
        {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }
    ).json({ success: true, token: token, Info: userInfo });
    console.log("token sent ! ")


}
async function handleSignUp(req, res) {
    const body = req.body;
    const { email, password } = body;
    const userid = gen();
    console.log("signing up ... ")
    //validation
    if (!email || !password) {
        return res.status(400).json({ success: false, reply: "missing fields" });
    }
    try {

        const result = await pool.query(
            `INSERT INTO users
        (userid, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`,
            [
                userid,
                email,
                password
            ]
        );

        res.status(201).json({ reply: "user created", tokenSent: null })

    } catch (err) {
        console.log("error occurred in creating new  user : read server log");
        console.log(`error : ${err}`);
        res.status(401).json({ reply: "user not created", tokenSent: null });
    }



}
async function handleToken(req, res) {
    const userInfo = {
        email: req.user.email,
        profile: req.user.profile
    }
    res.status(201)
        .json({ success: true, Info: userInfo });
}
export { handleSignUp, handleSignIn, handleToken };

