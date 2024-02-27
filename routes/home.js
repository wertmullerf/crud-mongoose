const express = require("express");
const {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento,
} = require("../controller/homeController");
const urlValida = require("../middlewares/urlValida");
const router = express.Router();

router.get("/", leerUrls);
router.post("/", urlValida, agregarUrl);
router.get("/eliminar/:id", eliminarUrl);
router.get("/editar/:id", editarUrlForm);
router.post("/editar/:id", urlValida, editarUrl);
router.get("/:url", redireccionamiento);

module.exports = router;
