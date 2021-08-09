const express = require('express');
const router = express.Router();


const { signup, login } = require('../controllers/auth')
const { userRegisterValidator, userLoginValidator } = require('../validators/auth');
const { runValidation } = require('../validators/index')
router.post("/signup", userRegisterValidator, runValidation, signup)
router.post("/login", userLoginValidator, runValidation, login)
router.get("/login", (req, res) => {
    return res.status(200).json({
        message: "hi prends!"
    })
})

module.exports = router;
