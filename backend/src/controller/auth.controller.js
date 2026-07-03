import userModel from './../model/user.model.js';
import jwt from "jsonwebtoken";
const salt = "cloude@beast#OS";
async function Token(user) {
    const payload = {
        email: user.email,
        userId: user._id
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
    const userExist = await userModel.findOne({ email });
    //send profile themes here.
    if (!userExist) { return res.status(404).json({ success: false, reply: "user Not registers", tokenSent: null }) }
    // user exist : 
    if (password !== userExist.password) {
        return res.status(400).json({ success: false, reply: "wrong password", tokenSent: null });
    }
    console.log("verifying ...")
    const token = await Token(userExist);
    console.log(`token generated`)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }).json({ success: true, token: token });
    console.log("token sent ! ")


}
async function handleSignUp(req, res) {
    const body = req.body;
    const { email, password } = body;
    console.log("signing up ... ")
    //validation
    if (!email || !password) {
        return res.status(400).json({ success: false, reply: "missing fields" });
    }
    console.log("DB state:", userModel.db.readyState);
    // new user validation 
    const exist = await userModel.findOne({ email })
    if (exist) { return res.status(400).json({ reply: "user already exists", token: null }) }
    //create new 
    try {
        const user = await new userModel({ email, password }).save();
        const token = await Token(user);
        res.status(201)
            .cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false })
            .json({ reply: "user created successfully", token: token, tokenSent: true });
        console.log(`token for ${email} is : ${token}`);
    } catch (err) {
        console.log("error occurred in creating new  user : ");
        console.log(`error : ${err}`);
        res.status(401).json({ reply: "user not created", tokenSent: null });
    }



}
async function handleToken(req, res) {
    res.status(201);

}
export { handleSignUp, handleSignIn, handleToken };

