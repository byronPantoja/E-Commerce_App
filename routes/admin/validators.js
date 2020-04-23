const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 5, max: 40 })
        .withMessage('Title must be between 5 and 40 characters.'),
    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage('Must be a number greater than 1.'),
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Please use a valid email address.')
        .custom(async(email) => {
            const existingUser = await usersRepo.getOneBy({
                email,
            });
            if (existingUser) {
                throw new Error('This Email is already in use.');
            }
        }),
    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 8 })
        .withMessage('Password must be 4 to 8 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 8 })
        .withMessage('Password must be 4 to 8 characters')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match.');
            }
            return true;
        }),
    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email not found!')
        .custom(async(email) => {
            const user = await usersRepo.getOneBy({
                email,
            });
            if (!user) {
                throw new Error('Email not found.');
            }
        }),
    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async(password, { req }) => {
            const user = await usersRepo.getOneBy({
                email: req.body.email,
            });
            if (!user) {
                throw new Error('Invalid password');
            }

            const validPassword = await usersRepo.comparePasswords(
                user.password,
                password
            );
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        }),
};