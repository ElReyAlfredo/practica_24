const mongoose = require("mongoose"); //inyectamos la dependencia de mongoose
const express = require("express"); //inyectamos express
const personsRoutes = require("./routes/persons"); //inyectamos el persons de routes
require("dotenv").config(); //inyectamos la variable de ambiente para MONGODB_URI en el .env

mongoose.Promise = global.Promise;
const app = express(); //instanciamos express
const port = process.env.PORT || 3000; //configuramos el puerto de escucha

app.set("view engine", "ejs"); //etablecemos la configuracion para el motor de vistas
app.use(express.urlencoded({ extended: false })); //Analizamos los request entrantes
app.use(personsRoutes); //usamos el personsRoutes

app.use("/assets", express.static(__dirname + "/public"));

//Nos conectamos a la base de datos de mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a TEST"))
  .catch((error) => console.error(error));

/*
app.get("/persona", function (req, res) {
  res.render("index", {});
});
*/
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
