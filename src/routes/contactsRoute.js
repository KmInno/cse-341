const contactsController = require('../controllers/contactsController');
const express = require('express');
const router = express.Router();

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getOne);

router.get ("/add", contactsController.contactForm);
router.get ("/edit/:id", contactsController.editContact);

router.post("/", contactsController.addContact);

router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);



module.exports = router;