import {Request, Response, Router } from 'express'
import { Localidades, Tests } from '../model/schemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getLocalidades = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Localidades.aggregate([
                {
                    $lookup: {
                        from: 'tests',
                        localField: '_nombre',
                        foreignField: '_localidad',
                        as: "_personas"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getLocalidad = async (req:Request, res: Response) => {
        const { nombre } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Localidades.aggregate([
                {
                    $lookup: {
                        from: 'tests',
                        localField: '_nombre',
                        foreignField: '_localidad',
                        as: "_personas"
                    }
                },{
                    $match: {
                        _nombre:nombre
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private postLocalidad = async (req: Request, res: Response) => {
        const { nombre, provincia , comunidad } = req.body
        await db.conectarBD()
        const dSchema={
            _nombre: nombre,
            _provincia: provincia,
            _comunidad: comunidad,
        }
        const oSchema = new Localidades(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
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
    private actualizaLocalidad = async (req: Request, res: Response) => {
        const { nombre } = req.params
        const { provincia , comunidad   } = req.body
        await db.conectarBD()
        await Localidades.findOneAndUpdate(
                {
                    _nombre: nombre,
                    _provincia: provincia,
                    _comunidad: comunidad,
                },
                {
                    new: true,
                    runValidators: true
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('La localidad que desea modificar no existe')
                        res.json({"Error":"No existe: "+nombre})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }
    
    private postTest = async (req: Request, res: Response) => {
        const { nombre, dni, telefono, email, fecha_n, sintomas, fecha_t, tipo_test,resultado, comunidad, provincia, localidad, calle, ingreso, activo } = req.body
        await db.conectarBD()
        const dSchema={
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
        }
        const oSchema = new Localidades(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
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
    
    private actualizaTest = async (req: Request, res: Response) => {
        const { ID } = req.params
        const { id, nombre, dni, telefono, email, fecha_n, sintomas, fecha_t, tipo_test,resultado, comunidad, provincia, localidad, calle, ingreso, activo  } = req.body
        await db.conectarBD()
        await Tests.findOneAndUpdate(
                { _id: id }, 
                {

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

                },
                {
                    new: true,
                    runValidators: true
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('El test que desea modificar no existe')
                        res.json({"Error":"No existe: "+ID})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

    misRutas(){
        this._router.get('/localidades', this.getLocalidades),
        this._router.get('/localidad/:nombre', this.getLocalidad),
        
        this._router.post('/postLocalidad', this.postLocalidad)
        //this._router.get('/borrarLocalidad/:nombre', this.getDeleteLocalidad)
        this._router.post('/actualizaLocalidad/:nombre', this.actualizaLocalidad)

        this._router.post('/postTest', this.postTest)
        //this._router.get('/borrarTest/:ID', this.getDeleteTest)
        this._router.post('/actualizaTest/:ID', this.actualizaTest)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
