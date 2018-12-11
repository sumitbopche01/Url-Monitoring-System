let routes = require("express").Router();
let urlController = require("../controllers/urlController");


routes.post('/', urlController.saveUrlInfo);
routes.get('/', urlController.listAllUrlsInfo);
routes.get('/:_id', urlController.singleUrlInfo);
routes.put('/:_id',urlController.updateUrlInfo);
routes.delete('/:_id',urlController.deleteUrlInfo);

module.exports = routes;
