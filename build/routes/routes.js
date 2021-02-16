"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const schemas_1 = require("../model/schemas");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        this.getLocalidades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Localidades.aggregate([
                    {
                        $lookup: {
                            from: 'tests',
                            localField: '_nombre',
                            foreignField: '_localidad',
                            as: "_personas"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getLocalidad = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield schemas_1.Localidades.aggregate([
                    {
                        $lookup: {
                            from: 'tests',
                            localField: '_nombre',
                            foreignField: '_localidad',
                            as: "_personas"
                        }
                    }, {
                        $match: {
                            _nombre: nombre
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postLocalidad = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, provincia, comunidad } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _provincia: provincia,
                _comunidad: comunidad,
            };
            const oSchema = new schemas_1.Localidades(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        /*
            private getDeleteLocalidad = async (req: Request, res: Response) => {
                const { localidad } = req.params
                await db.conectarBD()
                await Localidades.findOneAndDelete(
                    { nombre: localidad },
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) {
                                res.send(`No encontrado`)
                            }else {
                                res.send('Borrado correcto: '+ doc)
                            }
                        }
                    })
                db.desconectarBD()
            }
            */
        this.actualizaLocalidad = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const { provincia, comunidad } = req.body;
            yield database_1.db.conectarBD();
            yield schemas_1.Localidades.findOneAndUpdate({
                _nombre: nombre,
                _provincia: provincia,
                _comunidad: comunidad,
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('La localidad que desea modificar no existe');
                    res.json({ "Error": "No existe: " + nombre });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this.postTest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, dni, telefono, email, fecha_n, sintomas, fecha_t, tipo_test, resultado, comunidad, provincia, localidad, calle, ingreso, activo } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _dni: dni,
                _telefono: telefono,
                _email: email,
                _fecha_n: fecha_n,
                _sintomas: sintomas,
                _fecha_t: fecha_t,
                _tipo_test: tipo_test,
                _resultado: resultado,
                _comunidad: comunidad,
                _provincia: provincia,
                _localidad: localidad,
                _calle: calle,
                _ingreso: ingreso,
                _activo: activo,
            };
            const oSchema = new schemas_1.Localidades(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        /*
            private getDeleteTest = async (req: Request, res: Response) => {
                const { ID } = req.params
                await db.conectarBD()
                await Tests.findOneAndDelete(
                    { id: ID },
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) {
                                res.send(`No encontrado`)
                            }else {
                                res.send('Borrado correcto: '+ doc)
                            }
                        }
                    })
                db.desconectarBD()
            }*/
        this.actualizaTest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            const { id, nombre, dni, telefono, email, fecha_n, sintomas, fecha_t, tipo_test, resultado, comunidad, provincia, localidad, calle, ingreso, activo } = req.body;
            yield database_1.db.conectarBD();
            yield schemas_1.Tests.findOneAndUpdate({ _id: id }, {
                _nombre: nombre,
                _dni: dni,
                _telefono: telefono,
                _email: email,
                _fecha_n: fecha_n,
                _sintomas: sintomas,
                _fecha_t: fecha_t,
                _tipo_test: tipo_test,
                _resultado: resultado,
                _comunidad: comunidad,
                _provincia: provincia,
                _localidad: localidad,
                _calle: calle,
                _ingreso: ingreso,
                _activo: activo,
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El test que desea modificar no existe');
                    res.json({ "Error": "No existe: " + ID });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/localidades', this.getLocalidades),
            this._router.get('/localidad/:nombre', this.getLocalidad),
            this._router.post('/postLocalidad', this.postLocalidad);
        //this._router.get('/borrarLocalidad/:nombre', this.getDeleteLocalidad)
        this._router.post('/actualizaLocalidad/:nombre', this.actualizaLocalidad);
        this._router.post('/postTest', this.postTest);
        //this._router.get('/borrarTest/:ID', this.getDeleteTest)
        this._router.post('/actualizaTest/:ID', this.actualizaTest);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;
