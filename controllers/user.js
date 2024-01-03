const { User } = require('../models/user');

const userRegister = async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    try {
        if(!name || !phoneNumber || !email || !password){
            res.status(400).json({ message: 'Invalid user data' });
            return;
        }
        if(name.trim().length < 3) {
            res.status(400).json({ message: 'Invaild name' });
            return;
        }
        if(phoneNumber.trim().length < 10){
            res.status(400).json({ message: 'Invaild phone' });
            return;
        }
        if(password.trim().length < 6) {
            res.status(400).json({ message: 'Password length should be greater than 6' })
            return;
        }
        if(!emailRegex.test(email)){
            res.status(400).json({ message: 'Invalid email' })
            return;
        }
        const user = await User.create({ name, phoneNumber, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'User registration failed.' });
    }
}

const userLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await User.findOne({ where: { phoneNumber, password } })
        if(user && user.dataValues.isRegistered){
            req.session.userId = user.dataValues.id;
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid login credentials.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Login failed.' });
    }
}

module.exports = { userRegister, userLogin }