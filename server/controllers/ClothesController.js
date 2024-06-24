const {Controller} = require("./Controller");
const clothesService = require('../services/ClothesService');

class ClothesController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new ClothesController(clothesService);