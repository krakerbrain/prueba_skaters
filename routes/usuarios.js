const express = require("express");
const router = express.Router();

const { home, login, userProfile, usuarios, getRegistro, registro, eliminar, admin, changeStatus /* userMail */ } = require("../controllers/controladores");
const { verificaToken, autenticar } = require("../controllers/tokenVerify");

//router.get("/", home);
router.get("/login", login);
router.put("/userProfile", userProfile);
router.get("/", usuarios);
router.get("/registro", getRegistro);
router.post("/upload", registro);
router.delete("/borrarUsuario/:email", eliminar);
router.get("/admin", admin);
router.put("/status", changeStatus);
router.get("/datos", autenticar);
router.post("/verify", verificaToken);

module.exports = router;
