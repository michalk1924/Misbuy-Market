const { Exception, NotFoundException, InternalServerException } = require("../Exception");
const usersService = require("../services/UsersService");

class UsersController {

    constructor(service) {
        this.service = service;
    }

    async getAll(req, res) {
        try {
            const response = await this.service.getAll(req.query);
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
            const response = await this.service.getById(id);
            if (response == null)
                throw new NotFoundException(null)
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            return res.status(error.statusCode).json(error.message);
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
            return res.status(error.statusCode).json(error.message);
        }
    }

    async update(req, res) {
        const { id } = req.params;
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

    async delete(req, res) {
        const { id } = req.params;
        try {
            const response = await this.service.delete(id);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }

    async getUserItems(req, res) {
        const { id } = req.params;
        try {
            const response = await this.service.getUserItems(id);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }

    async getUserWishList(req, res) {
        const { id } = req.params;
        try {
            const response = await this.service.getUserWishList(id);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception) {
                error = new InternalServerException()
            }
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async updateWishList(req, res) {
        const { itemId } = req.body;
        const { id } = req.params;
        try {
            const response = await this.service.updateWishList(id, itemId);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }

    async deleteFromWishList(req, res) {
        const { id, itemId } = req.params;
        try {
            const response = await this.service.deleteFromWishList(id, itemId);
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode).json(error.message);
        }
    }
}

module.exports = new UsersController(usersService);
