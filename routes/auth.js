const express = require("express");
const { body } = require("express-validator");
const {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
} = require("../controller/authController");
const router = express.Router();

router.get("/register", registerForm);
router.post(
    "/register",
    [
        body("userName", "Ingrese un nombre válido").trim().notEmpty().escape(),
        body("email", "Ingrese un email valido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Ingrese una contraseña de minimo 4 caracteres")
            .trim()
            .isLength({ min: 4 })
            .escape()
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error("No coinciden las contraseñas");
                } else {
                    return value;
                }
            }),
    ],
    registerUser
);
router.get("/confirmar/:token", confirmarCuenta);
router.get("/login", loginForm);
router.post(
    "/login",
    [
        body("email", "Ingrese un email valido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Ingrese una contraseña de minimo 6 caracteres")
            .trim()
            .isLength({ min: 4 })
            .escape(),
    ],
    loginUser
);

module.exports = router;
