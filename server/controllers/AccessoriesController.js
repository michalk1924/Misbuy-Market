const {Controller} = require("./Controller");
const accessoriesService = require('../services/AccessoriesService');

class AccessoriesController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new AccessoriesController(accessoriesService);