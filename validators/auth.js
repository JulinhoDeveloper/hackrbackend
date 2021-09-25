const { check } = require('express-validator');

exports.userRegisterValidator = [

    check('name').not().isEmpty().withMessage('Nome é obrigatorio'),
    check('email').isEmail().withMessage('Digite um email válido'),
    check('password').isLength({ min: 6 }).withMessage('A senha tem que ser maior de 6 caracteres')

];