import jwt from "jsonwebtoken";

const salt = "cloude@beast#OS";
function handleTokenMiddleware(req, res, next) {

    const userInfo = req.cookies;
    const userToken = userInfo.token;
    try {
        if (!userToken) { return res.status(403).json({ success: false, reply: "no token found" }) }

        const tokenSign = jwt.verify(userToken, salt);

        req.user = tokenSign;
        next();

    } catch (e) {
        console.log("token error cannot approve access")
        return res.status(401).json({ success: false, msg: "token not verified to continue" })
    }


}
//if success : fals login again ! 
export { handleTokenMiddleware };