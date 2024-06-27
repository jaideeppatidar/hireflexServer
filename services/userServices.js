const User = require('../models/userModel');
const helper = require('../utils/helper');

exports.getAllUsers = async () => {
    return await User.find();
};

exports.createUser = async (userData) => {
    const hashedPassword = await helper.hashPassword(userData.password);
    const user = new User({
        ...userData,
        password: hashedPassword,
    });
    return await user.save();
};

exports.deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    return user;
};

exports.updateUser = async (userId, userData) => {
    if (userData.password) {
        userData.password = await helper.hashPassword(userData.password);
    }
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    return user;
};
