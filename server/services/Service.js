const { Exception, InternalServerException } = require('../Exception');
const usersRepository = require('../repositories/UsersRepository');
const fs = require('fs');
const path = require('path');

class Service {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll(filter) {
        try {
            const products = await this.repository.getAll(filter);
            const productsWithImages = await Promise.all(products.map(async product => {
                const { imageUrl, ...productWithoutImg } = product;
                let image = null;
                if (imageUrl) {
                    image = await getProductImage(imageUrl);
                    if (image)
                        product.image = image;
                    else
                        product.image = 'image not found';
                }
                return { ...productWithoutImg, image: image };
            }));
            return productsWithImages;
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async get(id) {
        try {
            const product = await this.repository.get(id);
            if (product == null) {
                return false;
            }
            const user = await usersRepository.getById(product.userId);
            product.phone = user?.phone;
            product.name = user?.name;
            product.email = user?.email;
            product.userId = null;
            if (product.imageUrl) {
                const image = await getProductImage(product.imageUrl);
                if (image)
                    product.image = image;
                else
                    product.image = 'image not found';
            }
            await this.update(id, { "viewsCounter": product.viewsCounter + 1 });
            return product;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async insert(productData, image) {
        let productDataWithImg = productData;
        try {
            if (image) {
                const imgName = await uploadProductImage(image);
                productDataWithImg = { ...productData, imageUrl: imgName };
            }
            const user = await usersRepository.getById(productData.userId);
            productDataWithImg.area = user?.area;
            productDataWithImg.viewsCounter = 0;
            return this.repository.insert(productDataWithImg);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async update(id, data, image) {
        try {
            let productDataWithImg = data;
            if (image) {
                const imgName = await uploadProductImage(image);
                productDataWithImg = { ...data, imageUrl: imgName };
            }
            return this.repository.update(id, productDataWithImg);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async delete(id) {
        try {
            const product = await this.repository.delete(id);
            console.log("deleted product" + JSON.stringify(product));
            if (product.imageUrl !== undefined) {
                await deleteProductImage(product.imageUrl);
            }
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async deleteAll() {
        try {
            return this.repository.deleteAll();
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }
}

async function uploadProductImage(file) {
    try {
        let id = getNextId();
        const newFileName = `${id}.png`;
        const uploadDir = path.join(__dirname, '../images');
        const fileBuffer = file.buffer;
        const filePath = path.join(uploadDir, newFileName);
        await fs.promises.writeFile(filePath, fileBuffer);
        return `./images/${newFileName}`;
    } catch (error) {
        console.log('Error uploading product image: ' + newFileName);
        throw error;
    }
}

function getNextId() {
    let currentId;
    const idFilePath = './files/id.txt';
    if (fs.existsSync(idFilePath)) {
        const idData = fs.readFileSync(idFilePath, 'utf8');
        currentId = parseInt(idData, 10);
    } else {
        currentId = 0;
    }
    currentId += 1;
    fs.writeFileSync(idFilePath, currentId.toString(), 'utf8');

    return currentId;
}

async function getProductImage(filePath) {
    try {
        const fileBuffer = await fs.promises.readFile(filePath);
        const base64Image = fileBuffer.toString('base64');
        return `data:image/png;base64,${base64Image}`;
    } catch (error) {
        console.error('Error reading product image:', filePath);
        return false;
    }
}

async function deleteProductImage(imagePath) {
    try {
        const fullPath = path.join(__dirname, '../', imagePath);
        await fs.promises.access(fullPath, fs.constants.F_OK);
        await fs.promises.unlink(fullPath);
        console.log(`Deleted image: ${imagePath}`);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Image not found: ${imagePath}`);
        } else {
            console.error('Error deleting product image:', error);
        }
        throw error;
    }
}

module.exports = { Service };
