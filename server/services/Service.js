const {Exception} = require('../Exception');


class Service {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll(parametersForQuery) {
        //to do...finish
        return this.repository.getAll(parametersForQuery);
    }


    async get(id) {
        try{
            return this.repository.get(id);
        }
        catch(error){
            if (typeof(error) == Exception)
                throw error;
            console.log(error);
            throw error;
        }
    }

    async insert(data) {
        return this.repository.insert(data);
    }

    async update(id, data) {

    }

    async delete(id) {

    }
}

module.exports = { Service };
