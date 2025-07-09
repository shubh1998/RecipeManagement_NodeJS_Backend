const DemoController = require("../controllers/DemoController/demo.controller");

const demoRoutes = require("express").Router();

demoRoutes.get('/demo', DemoController.fetchDemoService)

module.exports = demoRoutes