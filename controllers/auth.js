const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = (req, res) => {
    res.send("hey its auth routing")
};

exports.signup = async(req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(15); //generate salt
    const hashedPassword = await bcrypt.hash(password, salt); //generate password hashed
    const user = new User({ username, email, password: hashedPassword });
    try {
        const user = await User.findOne({ email });
        user && res.status(401).json({ message: 'This email is already taken' })
    } catch (err) {
        return res.status(500).json({
            message: `There is a error related to finding the user ${err}`
        })
    }
    // console.log(username, email, password);
    await user.save((err, user) => { //save in DB
        if (err) {
            console.log(`error while saving the data ${err}`)
            return res.status(400).json({
                message: `Failed to save user in DB ${err}`
            })
        }
        return res.status(200).json({
            message: `User is Saved in Db , ${user}`
        })
    })

};


exports.login = async(req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
        // const user = new User({ email, password });
    try {
        const user = await User.findOne({ email });
        !user && res.status(401).json({ error: 'User Does not Exsist' })
        const validPassword = await bcrypt.compare(password, user.password); //compare the password.....
        !validPassword && res.status(401).json({
            error: 'Invalid password',
        })
        const token = jwt.sign({ email }, //payload, secret key and 
            process.env.JWT_PASSCODE, //expire data can be specified as the third argument.
        );
        res.status(200).json({ message: `Login is Successful`, user, token })
    } catch (err) {

        return res.status(400).json({
            error: `Error in finding the user`
        })

    }


}
