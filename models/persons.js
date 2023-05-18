const mongoose = require("mongoose"); //inyectamos la dependecia de mogoose
//declaramos una variable para la instancia de schema para mongoose coincidiendo con nuestra base de datos
let PersonSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  tipoSangre: String,
  nss: String,
});

//Exportamos la instancia de modelos de mongoose
module.exports = mongoose.model("colecciones", PersonSchema);
