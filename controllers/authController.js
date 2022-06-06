const sendToken = require('../helpers/sendToken');
const User = require('../models/User');


exports.signup = async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({
            success: false,
            message: 'Please provide usename'
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).json({
            success: false,
            message: 'Please provide password'
        });
        return;
    }
    try {
        const user = await User.create(req.body);
        sendToken(user, 201, res);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`
        })
    }   
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    if (!username) {
        res.status(400).json({
            success: false,
            message: 'Please provide usename'
        });
        return;
    }
    if (!password) {
        res.status(400).json({
            success: false,
            message: 'Please provide password'
        });
        return;
    }
    try {
        const user = await User.findOne({username}).select("+password");

        if(!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid username'
            });
            return;
        }

        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: 'Wrong password'
            });
            return;
        }

        sendToken(user, 201, res);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: `Error: ${err.message}`,
        })
    }   
}
exports.logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}