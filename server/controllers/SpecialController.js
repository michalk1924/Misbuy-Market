const { Exception, InternalServerException } = require("../Exception");
const speicalService = require('../services/SpeicalService');

class SpecialController {

    async close(req, res) {
        try {
            await speicalService.close();
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }
}


module.exports = new SpecialController();
