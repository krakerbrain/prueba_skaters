<p align="center">
    <img src="public\assets\img\logo.png" alt="Image" width="300" height="200" />
</p>

# Prueba - Skate Park

En esta prueba deber谩s ocupar todos tus conocimientos para desarrollar un sistema que
involucre tus habilidades como Full Stack Developer, consolidando tus competencias en el
frontend y backend.

## Comenzando 馃殌

_Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas._

- $ git clone https://github.com/krakerbrain/prueba_skate_park
- $ cd ../path/to/the/file
- $ npm install
- $ node server.js

### Indicaciones:

- El sistema debe permitir registrar nuevos participantes.(http://localhost:3000/registro)

- Se debe crear una vista para que los participantes puedan iniciar sesi贸n con su
  correo y contrase帽a.(http://localhost:3000/login)

- Luego de iniciar la sesi贸n, los participantes deber谩n poder modificar sus datos,
  exceptuando el correo electr贸nico y su foto. Esta vista debe estar protegida con JWT
  y los datos que se utilicen en la plantilla deben ser extra铆dos del token.(http://localhost:3000/datos)

- La vista correspondiente a la ruta ra铆z debe mostrar todos los participantes
  registrados y su estado de revisi贸n.(http://localhost:3000/)

- La vista del administrador debe mostrar los participantes registrados y permitir
  aprobarlos para cambiar su estado.(http://localhost:3000/admin)

### Requerimientos

1. Crear una API REST con el Framework Express
2. Servir contenido din谩mico con express-handlebars
3. Ofrecer la funcionalidad Upload File con express-fileupload
4. Implementar seguridad y restricci贸n de recursos o contenido con JWT

### Implementaciones adicionales

- En la vista correspondiente a la ruta ra铆z se implementa bot贸n para ingresar a la vista de administrador
- Se hacen validaciones de password para no repetirlos en el formulario
- Se hace validaci贸n de correo para evitar que se ingrese un correo repetido
- La l贸gica del front se separa del HTML y se implementa en un m贸dulo aparte (archivo /public/index.js)
- La l贸gica del backend se separ贸 en diferentes m贸dulos: 
                     - Las consultas a la base datos (/database/consultas.js) 
                     - Las funciones que resuelven las consultas (/controllers/controladores.js)
                     - Las rutas (/routes/usuarios.js)
                     - Las configuraciones y m贸dulos requeridos(/server.js)
                     - Las funciones de autenticaci贸n y verificaci贸n del token(/controllers/tokenVerify.js)
- Se implementa m贸dulo Singleton para usar solo una instancia de pool(/database/pooldb.js)

### Despliegue

El usuario ingresa a la ruta ra铆z (http://localhost:3000/) en donde debe elegir si registrarse o loguearse. 
En esta misma vista puede entrar el administrador de la p谩gina.

El administrador ingresa a (http://localhost:3000/admin) y en esta vista puede aprobar o desaprobar la participaci贸n de 
un usuario

Si el usuario decide registrarse ingresa a (http://localhost:3000/registro) en donde deber谩 llenar sus datos teniendo
cuidado de no dejar campos vac铆os y no repetir la contrase帽a. Si el usuario ingresa un correo ya registrado, se despliega
un alert que indica que el correo ya ha sido registrado y la la ruta /registro se recarga para ser llenada nuevamente

Al terminar el registro o al apretar el bot贸n INICIAR SESI脫N desde la ruta ra铆z, el usuario ingresa a (http://localhost:3000/login)
donde deber谩 ingresar los datos correctos para registrarse. Si se aprueba el ingreso el usuario entra a (http://localhost:3000/datos)
donde podr谩 modificar todos los datos excepto el correo y la foto, y luego podr谩 actualizar su registro. Caso contrario,
el usuario no pasa la verificaci贸n o no tiene la aprobaci贸n del administrador, se despliega un alert que indica la negativa.

En la ruta de modificaci贸n de datos el usuario podr铆a querer eliminar su registro. Al presionar el bot贸n de eliminar, se despliega
un alert de confirmaci贸n de querer eliminar su registro. Luego de confirmar se despliega la ruta ra铆z donde podr谩 comprobar
que su registro ha sido eliminado

##### Las siguientes im谩genes representan las interacciones que debe tener el sitio web una vez terminado el desaf铆o.

###### As铆 deber铆a verse la vista de la ruta raiz

![](./readme_files/ruta_raiz.jpg)

###### Registro de Participantes

![](./readme_files/registro.jpg)

###### Login de participantes

![](./readme_files/login.jpg)

###### Vista de modificaci贸n de datos

![](./readme_files/datos.jpg)

###### Vista de administrador

![](./readme_files/admin.jpg)

## Construido con 馃洜锔?

- Javascript
- HTML
- CSS
- nodeJS(https://nodejs.org/en/)

#### Usando las librer铆as:

- [Express](https://expressjs.com/es/)
- [Express File Upload](https://www.npmjs.com/package/express-fileupload)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [node-postgres](https://www.https://www.npmjs.com/package/pg)
- [node.bcrypt.js](https://www.npmjs.com/package/bcrypt)
- [Handlebars](https://handlebarsjs.com/)
- [Bootstrap](https://getbootstrap.com/)

## Autor 鉁掞笍

- **Mario Montenegro**
