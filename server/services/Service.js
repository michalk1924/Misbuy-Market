const {Exception, InternalServerException} = require('../Exception');


class Service {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll(filter) {
        try{
            return this.repository.getAll(filter);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }


    async get(id) {
        try{
            return this.repository.get(id);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async insert(data) {
        try{
            return this.repository.insert(data);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async update(id, data) {
        try{
            return this.repository.update(id, data);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async delete(id) {
        try{
            return this.repository.delete(id);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }
}

module.exports = { Service };
