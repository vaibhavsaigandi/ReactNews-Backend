const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('username')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength({
        min: 6
    })
    .withMessage('Password must have atleast 6 characters')
];

exports.userLoginValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be valid email address'),
    check('password')
    .isLength({
        min: 6
    })
]