const { editUser, getUser, addUser, deleteUser, cambioStatus, mailVerify } = require("../database/consultas");

//Se renderiza /home
const home = (req, res) => {
  res.render("home");
};

//Se renderiza /login
const login = (req, res) => {
  res.render("login");
};

//Se renderiza /registro
const getRegistro = async (req, res) => {
  res.render("registro");
};

//Permite al usuario editar sus datos
const userProfile = async (req, res) => {
  const datos = req.body;
  try {
    const usuario = await editUser(datos);
    res.status(200).send(usuario);
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};

//Permite obtener todos los datos almacenados en la base de datos
const usuarios = async (req, res) => {
  try {
    const usuarios = await getUser();
    res.status(200).render("usuarios", { usuarios });
  } catch (error) {
    res.status(500).send({
      error: `Algo salió mal...${error}`,
      code: 500,
    });
  }
};

//Permite registrar usuario y subir una foto
const registro = async (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const { foto } = req.files;
  const { name } = foto;
  const { email, nombre, password, experiencia, especialidad } = req.body;
  const mail = await mailVerify(email);
  let mailUsers = mail.map((a) => a.email);
  if (mailUsers.includes(email)) {
    res.send(`<script>alert("Correo ya ha sido registrado");window.location.href = "/registro";</script>`);
  } else {
    const registro = await addUser(email, nombre, password, experiencia, especialidad, name);
    foto.mv(`./public/upload/${name}`, (err) => {
      if (err)
        return res.status(500).send({
          error: `Algo salió mal... ${err}`,
          code: 500,
        });
      res.send(`<script>alert("Registro exitoso");window.location.href = "/login";</script>`);
    });
  }
};

//Permite eliminar al usuario
const eliminar = async (req, res) => {
  try {
    const { email } = req.params;
    const respuesta = await deleteUser(email);
    respuesta > 0 ? res.send(`El usuario fue eliminado con éxito`) : res.send("Usuario no existe");
  } catch (error) {
    res.status(500).send({
      error: `Algo salio mal ${error}. Usuario no pudo ser eliminado`,
      code: 500,
    });
  }
};

//Renderiza /admin y carga datos de los usuarios
const admin = async (req, res) => {
  try {
    const usuarios = await getUser();
    res.render("admin", { usuarios });
  } catch (error) {
    res.status(500).send({
      error: `Algo salió mal...${error}`,
      code: 500,
    });
  }
};

//Permite cambiar el estatus del usuario
const changeStatus = async (req, res) => {
  const { id, estado } = req.body;
  console.log(id, estado);
  try {
    const usuario = await cambioStatus(id, estado);
    res.status(200).send(JSON.stringify(usuario));
  } catch (error) {
    res.status(500).send({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
};

module.exports = {
  home,
  login,
  userProfile,
  usuarios,
  getRegistro,
  registro,
  eliminar,
  admin,
  changeStatus,
};
