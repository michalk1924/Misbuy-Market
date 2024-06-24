const {Controller} = require("./Controller");
const electricalProductsService = require('../services/ElectricalProductsService');

class ElectricalProductsController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new ElectricalProductsController(electricalProductsService);