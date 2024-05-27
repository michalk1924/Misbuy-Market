const { Exception, NotFoundException } = require("../Exception");

class Controller {

    constructor( service) {
        this.service = service;
    }

    async getAll( req, res, next ) {
        try {
            const response = await this.service.getAll( req.query );
            console.log(response);
            return res.status( response.status || 500 ).json( response );
        } catch (e) {
            next(e);
        }
    }

    async get( req, res ) {
        const { id } = req.params;
        console.log(id);
        try {
            const response = await this.service.get( id );
            if(response == null)
                 throw new NotFoundException(null)
            console.log(response);
            return res.status(200).json( response );
        }  catch(error){
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }

    async insert( req, res, next ) {
        try {
            const response = await this.service.insert( req.body );
            console.log(response);
            return res.status( response.statusCode || 200 ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    async update( req, res, next ) {
        const { id } = req.params;
        try {
            const response = await this.service.update( id, req.body );
            return res.status( response.statusCode ).json( response );
        } catch (e) {
            next(e);
        }
    }

    async delete( req, res, next ) {
        const { id } = req.params;
        try {
            const response = await this.service.delete( id );
            return res.status( response.statusCode ).json( response );
        } catch (e) {
            next(e);
        }
    }

}

module.exports = { Controller };
