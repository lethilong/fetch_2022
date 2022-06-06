const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    //Remove Password From output
    user.password = undefined;

    //Store Access Token in Cookies
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        data: user,
        token,
    })

}
module.exports = sendToken;