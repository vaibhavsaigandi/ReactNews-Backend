const { validationResult } = require('express-validator'); // Finds the validation errors in this request and wraps them in an object with handy functions

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req); //is a object with all the errors.
    if (!errors.isEmpty()) {
        return res.status(400).json({ //returns the errors present in the array.
            error: errors.array()[0].msg
        });
    }
    next(); // calls the next consequent handler.
};