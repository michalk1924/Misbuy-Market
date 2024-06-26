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
            const products = this.repository.getAll(filter);

            // products = await Promise.all(products)
            // console.log("products serived", products);


            // const productsWithImages = await Promise.all(products.map(async product => {
            //     const image = await getProductImage(product.imageUrl);
            //     return { ...product, image: image };
            // }));

            // products = products.map(async product => {
            //     const image = await getImage(product.imageUrl) ;
            //     return { ...product, image: image };
            // });
            // products.forEach(async product => {
            //     const image = await getProductImage(product.imageUrl);
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
            // const user = await usersRepository.get(product.userId);
            // product.userName = user.name;
            // product.phone = user.phone;
            if (product.imageUrl) {
                const image = await getProductImage(product.imageUrl);
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

    async insert(productData, image) {
        let productDataWithImg = productData;
        try {
            if (image) {
                const imgName = await uploadProductImage(image);
                productDataWithImg = { ...productData, imageUrl: imgName };
            }
            //const user = await usersRepository.get(data.userId);
            //data.area = user?.area;
            productDataWithImg.viewsCounter = 0;
            return this.repository.insert(productDataWithImg);
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
            const product =  this.repository.delete(id);
            console.log("deleted product" + JSON.stringify(product));
            if (product.imageUrl) {
                //await deleteProductImage(product.imageUrl);
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

function getNextId() {
    let currentId;
    const idFilePath = './files/id.txt';
    // בדיקת אם הקובץ קיים
    if (fs.existsSync(idFilePath)) {
        // קריאת ה-ID מהקובץ
        const idData = fs.readFileSync(idFilePath, 'utf8');
        currentId = parseInt(idData, 10);
    } else {
        // אם הקובץ לא קיים, אתחל את ה-ID ל-0
        currentId = 0;
    }

    // העלאת ה-ID ב-1
    currentId += 1;

    // שמירת ה-ID החדש בקובץ
    fs.writeFileSync(idFilePath, currentId.toString(), 'utf8');

    return currentId;
}

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
async function getProductImage(filePath) {
    try {
        // Read the file buffer from the specified file path
        const fileBuffer = await fs.promises.readFile(filePath);

        // Convert the buffer to a base64 string for displaying as an image
        const base64Image = fileBuffer.toString('base64');

        // Return the base64 string in a format suitable for displaying in HTML
        return `data:image/png;base64,${base64Image}`;
    } catch (error) {
        console.error('Error reading product image:', error);
        throw error; // Re-throw the error to handle it in the caller function
    }
}


module.exports = { Service };
