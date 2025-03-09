const contactsController = require('../controllers/contactsController');
const express = require('express');
const router = express.Router();

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getOne);

module.exports = router;