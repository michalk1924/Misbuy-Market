const { Exception, NotFoundException, InternalServerException } = require("../Exception");

class Controller {

    constructor(service) {
        this.service = service;
    }

    async getAll(req, res) {
        try {
            const { _limit, _start, ...filter } = req.query;
            const result = await this.service.getAll(filter);
            const length = result.length;
            if (_limit != undefined && _start != undefined) {
                const limit_n = parseInt(_limit);
                const start_n = parseInt(_start);
                const sliceResult = result.slice(start_n, start_n + limit_n);
                return res.status(200).json({ data: result ? sliceResult : [], length: length });
            }
            else res.status(200).json({ data: result ? result : [], length: length });
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
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
            return res.status(error.statusCode || 500).json(error.message);
        }
    }
    async insert(req, res) {
        try {
            let response = "";
            const image = req.file;
            const product = req.body;
            response = await this.service.insert(product, image);
            return res.status(200).json(response);

        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }
    async update(req, res) {
        const image = req.file;
        const { id } = req.params;
        try {
            const response = await this.service.update(id, req.body, image);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const response = await this.service.delete(id);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

}


module.exports = { Controller };
