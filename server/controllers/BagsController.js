const {Controller} = require("./Controller");
const bagsService = require('../services/BagsService');

class BagsController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new BagsController(bagsService);