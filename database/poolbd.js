const { Pool } = require("pg");

const config = {
  user: "mgamgxookbxcxb",
  host: "ec2-34-233-214-228.compute-1.amazonaws.com",
  database: "d1h33nodfdmc20",
  password: "3c194935ceb2334b09746805045539c805505fe656e5f5ad1f6b22fa4be7a7dc",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

/* const config = {
  user: "mario",
  host: "localhost",
  database: "skatepark",
  password: "1234",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};
 */
const Singleton = (function () {
  var instance;

  function createInstance() {
    var classObj = new Pool(config);
    return classObj;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
        console.log("Crea Pool");
      } else {
        console.log("Ya existe Pool");
      }
      return instance;
    },
  };
})();

module.exports = Singleton;
