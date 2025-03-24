const mongodb = require('../config/mongodb');

async function getContactsCollection() {
    const db = await mongodb.getDB();
    return db.collection('contacts');
}

module.exports = {
    getContactsCollection
};