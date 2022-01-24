const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/img", express.static(__dirname + "/public/assets/img"));

let port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server ON"));

app.use(
  expressFileUpload({
    limits: { fileSize: 50000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
  })
);

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/mainLayout`,
    //este helper permite que una lista de handlebars comience en uno
    helpers: {
      inc: function (value, options) {
        return parseInt(value) + 1;
      },
    },
  })
);
app.set("view engine", "hbs");

//Configuración global de rutas
app.use(require("./routes/index"));
