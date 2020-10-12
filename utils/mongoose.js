const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const db = mongoose.connection;

module.exports = { mongoose, Schema, SchemaTypes, db };
