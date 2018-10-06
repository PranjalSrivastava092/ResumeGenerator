const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('middlewares/db');
const Doc = db.Doc;

module.exports = {
    get_All,
    Create,
    Update,
    delete: delete
};

async function get_All() {
    return await Doc.find().select();
}

