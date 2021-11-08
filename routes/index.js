const express = require("express");
const app = express();
const router = require("./usuarios");

app.use("/", router);
app.use("/login", router);
app.use("/datos", router);
app.use("/verify", router);
app.use("/userProfile", router);
app.use("/usuarios", router);
app.use("/regUser", router);
app.use("/upload", router);
app.use("/borrarUsuarios", router);
app.use("/admin", router);
app.use("/status", router);

module.exports = app;
