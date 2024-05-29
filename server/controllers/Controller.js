const { Exception, NotFoundException, InternalServerException } = require("../Exception");

class Controller {

    constructor(service) {
        this.service = service;
    }

    async getAll(req, res) {
        try {
            const response = await this.service.getAll(req.query);
            console.log(response);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }


    async get(req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const response = await this.service.get(id);
        if (response == null)
            throw new NotFoundException(null)
        return res.status(200).json(response);
    } catch (error) {
        if (!error instanceof Exception)
            error = new InternalServerException()
        console.log(error.message);
        return res.status(error.statusCode).json(error.message);
    }
}

    async insert(req, res) {
    try {
        const response = await this.service.insert(req.body);
        return res.status(200).json(response);
    } catch (error) {
        if (!error instanceof Exception)
            error = new InternalServerException()
        console.log(error.message);
        return res.status(error.statusCode).json(error.message);
    }
}

    async update(req, res) {
    const {id} = req.params;
    try {
        const response = await this.service.update(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        if (!error instanceof Exception)
            error = new InternalServerException()
        console.log(error.message);
        return res.status(error.statusCode).json(error.message);
    }
}

    async delete (req, res, next) {
    const {id} = req.params;
    try {
        const response = await this.service.delete(id);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        if (!error instanceof Exception)
            error = new InternalServerException()
        console.log(error.message);
        return res.status(error.statusCode).json(error.message);
    }
}

}

module.exports = { Controller };
