const express = require("express"); //Inyectamos la dependencia de express
const router = express.Router(); //Generamos la instancia del router
const mongoose = require("mongoose"); //Inyectamos la dependencia de mongoose
let Person = require("../models/persons"); //Y inyectamos la dependencia de Persons del modelo

//Agregamos la ruta /gente por el metodo get, esto debe ser asincrona por lo cual deberia retornar una promesa que se debe de cumplir, le ponemos al persons await para que cargen los datos en segundo plano
/*
router.get("/gente", async (req, res) => {
  const Persons = await Person.find({});
  res.json(Persons);
});
*/

//Aqui simplemente vamos a hacer lo mismo que la ruta anterior, es mas mejor la sobrescribimos pero ahora la renderizamos, obiamente como necesitamos aplicar la funcion asincrona
// encontramos person y lo renderizamos indicandole que es en index y con la informacion de persons la cual la destructuramos con {}
router.get("/gente", async (req, res) => {
  const Persons = await Person.find({});
  res.render("index", { Persons });
});

//Renderiza datos de agregar (crear html-ejs)
router.get("/add", function (req, res) {
  res.render("addItem");
});

//Endpoint POST agregar una persona
router.post("/agregar", async (req, res) => {
  let person = Person({
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  });
  person.save().then(() => res.redirect("/gente"));
});

//Render el campo para update
router.get("/findById/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((myPerson) => {
      res.render("personUpdate", { myPerson });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.post("/updatePerson", (req, res) => {
  Person.findByIdAndUpdate(req.body.objId, {
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  })
    .then((data) => {
      res.redirect("/gente");
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
////////////////////////////////////////////////////
//Primero vamos a obtener el id del dato para poder ubicarlo y eliminarlo, enonces una vez encontrado le ponemos findByIdAndDelete y lo eliminamos y nos mantenemos en la ruta principal
router.get("/deletePerson/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/gente");
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//Agregamos el endpoint para buscar el documento de acuerdo al criterio de busqueda
//En la cual estamos utilizando una expresion regular para que se realice la busqueda haciendo caso omiso de las mayusculas y minusculas
router.post("/find", (req, res) => {
  Person.find({ nombre: { $regex: req.body.criteria, $options: "i" } })
    .then((Persons) => res.render("index", { Persons }))
    .catch((error) => res.json({ message: error }));
});
//Si no hay ningun error entonces la busqueda funcionara con o sin mayusculas
////////////////////////////////////////////////////
//Exportamos el ruteador
module.exports = router;
