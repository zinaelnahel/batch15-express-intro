const express = require("express");
const noodlesRouter = express.Router();
const flavours = require("../data/noodlesFlavour");
const { check, validationResult } = require("express-validator");

// API serves noodles data
// CRUD
// Read data
// Create data
// Delete data
// Update data

noodlesRouter.get("/:id", (req, res) => {
  //   console.log(req.params);
  const flavour = flavours.find(
    (flavour) => flavour.id === Number(req.params.id)
  );

  if (flavour) {
    res.send(flavour);
  } else {
    res.status(404).send("Sorry, we do not have that flavour in stock");
  }
});

noodlesRouter.get("/", (req, res) => {
  console.log(req.query);

  if (req.query.country) {
    const filteredFlavours = flavours.filter(
      (flavour) => flavour.country === req.query.country
    );
    res.send(filteredFlavours);
  } else {
    res.send(flavours);
  }
});

noodlesRouter.post(
  "/",
  [
    check("name", "The flavour name should contain at least 2 characters")
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
    check("country", "The country should contain at least 2 characters")
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
  ],
  (req, res) => {
    // Naive data validation system
    //   if (
    //     !req.body.name ||
    //     !req.body.country ||
    //     req.body.name.length < 2 ||
    //     req.body.country.length < 2
    //   ) {
    //     return res
    //       .status(400)
    //       .send(
    //         "A valid flavour name and country are required to create a flavour"
    //       );
    //   }

    // Data validation through express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    //   console.log(req.body);
    const newFlavour = {
      id: flavours.length + 1,
      name: req.body.name,
      country: req.body.country,
    };
    flavours.push(newFlavour);
    res.status(201).send(newFlavour);
    // Shortcut
    //   res.sendStatus(201)
  }
);

noodlesRouter.delete("/:id", (req, res) => {
  // 1/ check if the noodle flavour exists
  const flavour = flavours.find(
    (flavour) => flavour.id === Number(req.params.id)
  );
  // 2/ If it does not exist, send a 404
  if (!flavour) return res.status(404).send("No such flavour!");

  // 3/ If it does exit, we need to remove the flavour from the array
  const targetIndex = flavours.indexOf(flavour);
  flavours.splice(targetIndex, 1);

  // 4/ Send back the deleted data
  res.send(flavour);
});

noodlesRouter.put("/:id", (req, res) => {
  // 1/ check if the noodle flavour exists
  const flavour = flavours.find(
    (flavour) => flavour.id === Number(req.params.id)
  );
  // 2/ If it does not exist, send a 404
  if (!flavour) return res.status(404).send("No such flavour!");

  flavour.name = req.body.name;
  flavour.country = req.body.flavour;

  res.send(flavour);
});

module.exports = noodlesRouter;
