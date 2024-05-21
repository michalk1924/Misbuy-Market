
class Controller {

    constructor( service ) {
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

    async get( req, res, next ) {
        const { id } = req.params;
        try {
            const response = await this.service.get( id );
            return res.status( response.statusCode ).json( response );
        } catch (e) {
            next(e);
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
