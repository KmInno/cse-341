const { response } = require('express');
const { ObjectId } = require('mongodb');
const { getContactsCollection } = require('../models/contacts');

const getAll = async (req, res) => {
    try {
        const collection = await getContactsCollection();
        const contacts = await collection.find({}).toArray();
        console.log("response 1 from server", contacts);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(contacts));
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        const collection = await getContactsCollection();
        const contact = await collection.findOne({ _id: new ObjectId(req.params.id) });
        console.log("response 2 from server", contact);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(contact));
    } catch (error) {
        console.error('Error retrieving contact:', error);
        res.status(500).send('Internal Server Error');
    }
};

const contactForm = async (req, res, next) => {
    res.render("addContact", {
        title: "add contact"
    });
    next()
}

const editContact = async (req, res, next) => {
    try {
        const collection = await getContactsCollection();
        const contact = await collection.findOne({ _id: new ObjectId(req.params.id) });
        console.log("response 3 from server", contact);
        res.render("editContact", {
            title: "edit contact",
            contact: contact
        });
    } catch (error) {
        console.error('Error retrieving contact for edit:', error);
        res.status(500).send('Internal Server Error');
    }
}

const addContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const newContact = {
            name,
            email,
            phone,
            address: {
                city: address.city,
                country: address.country
            }
        };
        const collection = await getContactsCollection();
        const result = await collection.insertOne(newContact);
        console.log("response 4 from server", newContact);

        res.status(201).send({ message: 'Contact added', contact: result });
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(400).send({ message: 'Error adding contact', error: error });
    }
};

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const updatedContact = {
            name,
            email,
            phone,
            address: {
                city: address.city,
                country: address.country
            }
        };
        const collection = await getContactsCollection();
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedContact }
        );
        console.log("response 5 from server", updatedContact);

        if (result.matchedCount === 0) {
            res.status(404).send({ message: 'Contact not found' });
        } else {
            res.status(200).send({ message: 'Contact updated', contact: updatedContact });
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(400).send({ message: 'Error updating contact', error: error });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getContactsCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        console.log("response 6 from server", result);

        if (result.deletedCount === 0) {
            res.status(404).send({ message: 'Contact not found' });
        } else {
            res.status(200).send({ message: 'Contact deleted' });
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(400).send({ message: 'Error deleting contact', error: error });
    }
};

module.exports = {
    getAll, getOne, contactForm, editContact, addContact, updateContact, deleteContact
};