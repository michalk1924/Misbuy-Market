const { Exception, NotFoundException, InternalServerException } = require("../Exception");
//const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');


class Controller {

    constructor(service) {
        this.service = service;
    }

    async getAll(req, res) {
        try {
            const response = await this.service.getAll(req.query);
            console.log("response" + response);
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
            //console.log("response" + response.image.ToString());
            if (response == null)
                throw new NotFoundException(null)
            return res.status(200).json(response);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error?.message);
            return res.status(error.statusCode).json(error.message);
        }
    }
    async insert(req, res) {
        try {
            let response = "";
            const image = req.file;
            const product = req.body;
            let productDataWithImg=product;
            if (image) {
                const imgName = await uploadProductImage(image);
                console.log(imgName);
                productDataWithImg = { ...product, imageUrl: imgName };
            }
            console.log(productDataWithImg);
            response = await this.service.insert(productDataWithImg);
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

}


async function uploadProductImage(file) {
    try {
        // let id = await ProductsServices.getNextProductId();
        const newFileName = `1.png`;
        const uploadDir = path.join(__dirname, '../images'); // Relative path to the images directory

        // Read the file buffer from the file object
        const fileBuffer = file.buffer;

        // Construct the full path to save the file
        const filePath = path.join(uploadDir, newFileName);

        // Write the file buffer to the specified file path
        await fs.promises.writeFile(filePath, fileBuffer);
        return `./images/${newFileName}`;
    } catch (error) {
        console.error('Error uploading product image:', error);
        throw error; // Re-throw the error to handle it in the caller function
    }
}

module.exports = { Controller };
