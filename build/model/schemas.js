"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tests = exports.Localidades = void 0;
const mongoose_1 = require("mongoose");
const LocalidadSchema = new mongoose_1.Schema({
    _nombre: String,
    _provincia: String,
    _comunidad: String,
}, {
    collection: 'localidades'
});
const TestSchema = new mongoose_1.Schema({
    _id: Number,
    _nombre: String,
    _dni: String,
    _telefono: Number,
    _email: String,
    _fecha_n: Date,
    _sintomas: Array,
    _fecha_t: Date,
    _tipo_test: String,
    _resultado: String,
    _comunidad: String,
    _provincia: String,
    _localidad: String,
    _calle: String,
    _ingreso: Boolean,
    _activo: Boolean,
}, {
    collection: 'tests'
});
exports.Localidades = mongoose_1.model('localidades', LocalidadSchema);
exports.Tests = mongoose_1.model('tests', TestSchema);
