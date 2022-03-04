const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({message: 'Missing authorization token'});
    }

    const user = await User.findOne({ token });
    if (!user) {
        return res.status(401).send({message: 'No user found with this token'});
    }

    req.user = user;
    next();
};