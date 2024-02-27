const Url = require("../models/Url");
const leerUrls = async (req, res) => {
    try {
        const urls = await Url.find().lean();
        res.render("home", {
            urls: urls,
        });
    } catch (error) {}
};

const agregarUrl = async (req, res) => {
    const { origin } = req.body;
    try {
        const url = new Url({ origin: origin });
        await url.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

const eliminarUrl = async (req, res) => {
    const { id } = req.params;
    console.log(typeof id);
    try {
        await Url.findByIdAndDelete(id);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

const editarUrlForm = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await Url.findById(id).lean();
        console.log(url);
        res.render("home", {
            url,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};
const editarUrl = async (req, res) => {
    const { id } = req.params;
    const { origin } = req.body;
    try {
        await Url.findByIdAndUpdate(id, { origin });
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

const redireccionamiento = async (req, res) => {
    const { url } = req.params;

    try {
        const urlDB = await Url.findOne({ shortURL: url });
        console.log(urlDB);
        res.redirect(urlDB.origin);
    } catch (error) {}
};

module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento,
};
