const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const loginForm = (req, res) => {
    res.render("login", { mensajes: req.flash("mensajes") });
};

const registerForm = (req, res) => {
    res.render("register", { mensajes: req.flash("mensajes") });
};

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/register");
    }
    const { userName, email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) throw new Error("Ya existe ese usuario");
        user = new User({ userName, email, password, tokenConfirm: uuidv4() });
        await user.save();
        req.flash("mensajes", [{ msg: "Revisa tu correo para verificar" }]);
        res.redirect("/auth/login");
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect("/auth/register");
    }
};

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ tokenConfirm: token });
        if (!user) throw new Error("No existe este usuario");
        user.cuentaConfirmada = true;
        user.tokenConfirm = null;
        await user.save();
        req.flash("mensajes", [
            { msg: "Cuenta verificada, puedes iniciar sesión" },
        ]);
        res.redirect("/auth/login");
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect("/auth/register");
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/login");
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("No existe este email");
        if (!user.cuentaConfirmada) throw new Error("Falta confirmar cuenta");

        if (!(await user.comparePassword(password)))
            throw new Error("Contraseña no correcta");

        res.redirect("/");
    } catch (error) {
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect("/auth/login");
    }
};
module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
};
