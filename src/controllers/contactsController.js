const { response } = require('express');
const mongodb = require('../config/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const db = mongodb.getDB();
    const contacts = await db.collection('contacts').find().toArray();
    console.log("response 1 from server", contacts);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(contacts));
};

const getOne = async (req, res) => {
    const db = mongodb.getDB();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    console.log("response 2 from server", contact);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(contact));
}

module.exports = {
    getAll, getOne
};