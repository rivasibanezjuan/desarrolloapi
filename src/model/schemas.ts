import { Schema, model } from 'mongoose'

const LocalidadSchema = new Schema({
    _nombre: String,
    _provincia: String,
    _comunidad: String,
},{
    collection:'localidades'
})

const TestSchema = new Schema({
    _id: Number,
    _nombre: String,
    _dni: String,
    _telefono: Number,
    _email: String,
    _fecha_n:Date,
    _sintomas: Array,
    _fecha_t:Date,
    _tipo_test: String,
    _resultado: String,
    _comunidad: String,
    _provincia: String,
    _localidad: String,
    _calle: String,
    _ingreso: Boolean,
    _activo: Boolean,
},{
    collection:'tests'
})

export const Localidades = model('localidades', LocalidadSchema  )
export const Tests = model('tests', TestSchema  )
