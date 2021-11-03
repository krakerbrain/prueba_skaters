//Verificar Password
const verify = async () => {
  let email = document.getElementById("emailPass").value;
  let password = document.getElementById("pass").value;
  let payload = { email, password };
  await axios
    .post("/verify", payload)
    .then((data) => {
      const token = data.data;
      alert(`Autenticado con éxito!`);
      sessionStorage.setItem("token", JSON.stringify(token));
      window.location.href = `/datos?token=${token}`;
      console.log(token);
    })
    .catch(({ response }) => alert(response.data.error));
};

//Mostrar u ocultar contraseña
const showPass = () => {
  let passHide = document.getElementById("password");
  let passHide2 = document.getElementById("passValidar");
  if (passHide.type === "password") {
    passHide.type = "text";
    passHide2.type = "text";
  } else {
    passHide.type = "password";
    passHide2.type = "password";
  }
};

//Modificar perfil de usuario
let urlData = "http://localhost:3000/userProfile";
let emailData = document.getElementById("emailData");
let nombreData = document.getElementById("nombreData");
let passwordData = document.getElementById("password");
let passValidarData = document.getElementById("passValidar");
let experienciaData = document.getElementById("experienciaData");
let especialidadData = document.getElementById("especialidadData");

const editProfile = async () => {
  if (passwordData.value !== passValidarData.value) {
    alert("Las contraseñas deben ser iguales");
  } else {
    let data = {
      emailData: emailData.value,
      nombreData: nombreData.value,
      passwordData: passwordData.value,
      experienciaData: parseInt(experienciaData.value),
      especialidadData: especialidadData.value,
    };

    await axios
      .put(urlData, data)
      .then(() => {
        alert("Los datos se han actualizado");
        window.location.href = `/usuarios`;
      })
      .catch(({ response }) => alert(response.data.error));
  }
};

// Validación de password en front
const campos = {
  password: false,
};

const formulario = document.getElementById("formReg");
const inputs = document.querySelectorAll("#formReg input");

const validarForm = (e) => {
  switch (e.target.name) {
    case "password":
      validarPassword();
      break;
    case "passValidar":
      validarPassword();
      break;
  }
};

const validarPassword = () => {
  let password = document.getElementById("password").value;
  let passValidar = document.getElementById("passValidar").value;
  if (password && passValidar) {
    if (password !== passValidar) {
      document.querySelector(`#grupoPass .passError`).classList.add("passErrorActive");
      campos["password"] = false;
    } else {
      document.querySelector(`#grupoPass .passError`).classList.remove("passErrorActive");
      campos["password"] = true;
    }
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarForm);
  input.addEventListener("blur", validarForm);
});

//Eliminar usuario
let urlDelete = "http://localhost:3000/borrarUsuario/";
const deleteProfile = async () => {
  await axios.delete(urlDelete + emailData.value).then(() => {
    let check = confirm("Esta a punto de eliminar su usuario. ¿ESTA SEGURO?");
    if (check) {
      alert("Usuario eliminado");
      window.location.href = `/`;
    }
  });
};

//Vista admin - modificar status
const changeStatus = async (id, e) => {
  const estado = e.checked;
  try {
    await axios.put("/status", {
      id,
      estado,
    });
    alert(estado ? "Usuario habilitado" : "Usuario deshabilitado");
  } catch ({ response }) {
    const { data } = response;
    const { error } = data;
    alert(error);
  }
};
