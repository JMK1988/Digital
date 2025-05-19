const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
app.get("/bienvenida", (req, res) => {
  res.send("<h1 style='color: blue;'>Bienvenidos a todos</h1>");
});
app.get("/usuario", (req, res) => {
    const usuario = {  
        nombre: "Juan",  
        apellido: "Perez",  
        edad: 28,  
        correo: "juan.perez@juanperez.com"  
    };  
    res.json(usuario);
  });
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto CAMBIAMOS: ${PORT}`);
});