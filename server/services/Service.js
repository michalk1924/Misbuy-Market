
class Service {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll(parametersForQuery) {
        //to do...finish
        return this.repository.getAll(parametersForQuery)
    }


    async get(id) {

    }

    async insert(data) {

    }

    async update(id, data) {

    }

    async delete(id) {

    }
}

module.exports = { Service };
