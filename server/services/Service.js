const { Exception, InternalServerException } = require('../Exception');
const usersRepository = require('../repositories/UsersRepository');

async function getImage(url) {
    if (url == null || url == undefined) {
        return 'no image';
    }
    else {
        const imageURL = url //`${url.split("\\").join("/")}`;
        const imageData = await fs.promises.readFile(imageURL);
        //const imageBuffer = await imageData.buffer();
        const base64Image = imageData.toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
    }
}

class Service {

    constructor(repository) {
        this.repository = repository;
    }


    async getAll(filter) {
        try {
            const products = this.repository.getAll(filter);
            // products = products.map(async product => {
            //     const image = await getImage(product.imageUrl) ;
            //     console.log("i" + image[2]);
            //     return { ...product, image: image };
            // });
            // products.forEach(async product => {
            //     const image = await getImage(product.imageUrl);
            //     console.log("image" + image[5]);
            //     product.image = image;
            // });
            return products;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }


    async get(id) {
        try {
            //await this.update(id, {"viewsCounter": ++this.viewsCounter});
            const product = await this.repository.get(id);
            const user = await usersRepository.get(product.userId);
            product.userName = user.name;
            product.phone = user.phone;
            if (product.imageUrl) {
                const image = await getImage(product.imageUrl);
                console.log("image" + image[7]);
                product.image = image;
            }
            return product;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async insert(data) {
        try {
            const user = await usersRepository.get(data.userId);
            data.area = user?.area;
            data.viewsCounter = 0;
            return this.repository.insert(data);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async update(id, data) {
        try {
            return this.repository.update(id, product);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async delete(id) {
        try {
            return this.repository.delete(id);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async deleteAll()
    {
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


module.exports = { Service };
