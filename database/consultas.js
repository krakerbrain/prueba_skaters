const PoolSingleton = require("./poolbd");
const pool = PoolSingleton.getInstance();

const getUser = async () => {
  try {
    const result = await pool.query("SELECT * FROM skaters ORDER BY id");
    return result.rows;
  } catch (error) {
    return error;
  }
};

const mailVerify = async (email) => {
  let params = {
    text: "SELECT email FROM skaters WHERE email = $1",
    values: [email],
  };

  try {
    const result = await pool.query(params);
    return result.rows;
  } catch (error) {
    return error;
  }
};

const verificar = async (email, password) => {
  let params = {
    text: "SELECT * FROM skaters WHERE email = $1 AND password = $2",
    values: [email, password],
  };
  try {
    const result = await pool.query(params);
    return result.rows;
    console.log(result.rows);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const editUser = async (datos) => {
  const editSkater = Object.values(datos);
  const consulta = {
    text: `UPDATE skaters 
          SET nombre = $2, 
                password = $3, 
                anos_experiencia = $4, 
                especialidad = $5
          WHERE email = $1 RETURNING *;`,
    values: editSkater,
  };
  try {
    const result = await pool.query(consulta);
    return result.rows;
  } catch (error) {
    return error;
  }
};
const addUser = async (email, nombre, password, anos_experiencia, especialidad, foto) => {
  //const datosSkater = Object.values(datos);
  const consulta = {
    text: `INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) 
                      values ($1,$2,$3,$4,$5,$6,true) RETURNING *;`,
    values: [email, nombre, password, anos_experiencia, especialidad, foto],
  };

  try {
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (email) => {
  const consulta = {
    text: "DELETE FROM skaters WHERE email = $1",
    values: [email],
  };
  try {
    const result = await pool.query(consulta);
    return result.rows;
  } catch (error) {
    return error;
  }
};
const cambioStatus = async (id, estado) => {
  const result = await pool.query(`UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *;`);
  const usuario = result.rows[0];
  return usuario;
};

module.exports = {
  getUser,
  verificar,
  editUser,
  addUser,
  deleteUser,
  cambioStatus,
  mailVerify,
};
