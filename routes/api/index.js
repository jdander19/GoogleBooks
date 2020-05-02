// Dependencies
const router = require("express").Router();
const bookRoutes = require("./books.js");

// Item routes
router.use("/items", bookRoutes);

//Exporting
module.exports = router;
