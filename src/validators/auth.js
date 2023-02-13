const { check } = require('express-validator')
const db = require('../db')

// password
const password = check('password').isLength({ min: 6, max: 15 }).withMessage('Password has to be between 6 to 15 characters.')

// email
const email = check('email').isEmail().withMessage('Please provide a valid email.')

// check if email exists
const emailExists = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * from users WHERE email = $1', [
        value,
    ])
    if (rows.length) {
        throw new Error('Email already exists.')
    }
})

module.exports = {
    registerValidation: [email, password, emailExists], 
}