const { close } = require('../repositories/connectMongoDB');
const { Exception, InternalServerException } = require('../Exception');

class SpecialService {

    async close(filter) {
        try {
           close();
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

}

module.exports = new SpecialService();
