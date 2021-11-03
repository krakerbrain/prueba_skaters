const jwt = require("jsonwebtoken");
const secretKey = "grupo0028";

const { verificar, mailVerify } = require("../database/consultas");

//Autentica Token
const autenticar = async (req, res) => {
  const { token } = req.query;
  console.log("Verifica Token");
  if (!token) {
    return res.status(401).send({ auth: false, message: "No se ha entregado un token." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const { data } = decoded;

    const datos = data[0];
    const { email, nombre, password, anos_experiencia, especialidad } = datos;

    const user = await mailVerify(email);
    if (!user) {
      return res.status(404).send({ auth: false, message: "Usuario no encontrado" });
    }

    return res.status(200).render("datos", { email, nombre, password, anos_experiencia, especialidad });
  } catch (error) {
    return res.status(500).send({ auth: false, message: "Token invalido" });
  }
};

//Verifica Token

const verificaToken = async (req, res) => {
  const { email, password } = req.body;
  const user = await verificar(email, password);

  if (email === "" || password === "") {
    res.status(401).send({
      error: "Debe llenar todos los campos",
      code: 401,
    });
  } else {
    if (user.length != 0) {
      if (user[0].estado) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 120,
            data: user,
          },
          secretKey
        );
        res.send(token);
      } else {
        res.status(401).send({
          error: "Usuario no autorizado",
          code: 404,
        });
      }
    } else {
      res.status(404).send({
        error: "Correo o contraseña incorrecta",
        code: 404,
      });
    }
  }
};

module.exports = {
  autenticar,
  verificaToken,
};
