const { Controller } = require("./Controller");
const allItemsService = require('../services/AllItemsService');
const { Exception, InternalServerException } = require("../Exception");

class AllItemsController {

    async get(req, res) {
        const { id } = req.params;
        try {
            const response = await allItemsService.get(id);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const response = await allItemsService.getAll(req.query);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }
}

module.exports = new AllItemsController();