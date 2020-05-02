// Dependencies
const router = require("express").Router();
const booksController = require("../../controllers/books-controller.js");

// Matches with "/api/books"
router.route("/").get(booksController.findAll).post(booksController.create);

// Matches with "/api/books/:id"
router
	.route("/:id")
	.get(booksController.findById)
	.put(booksController.update)
	.delete(booksController.remove);

// Exporting
module.exports = router;
