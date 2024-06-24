const {Controller} = require("./Controller");
const shoesService = require('../services/ShoesService');

class ShoesController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new ShoesController(shoesService);