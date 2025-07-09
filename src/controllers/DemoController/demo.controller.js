const DemoService = require("../../services/DemoServices/demo.service");

class DemoController { 
    static fetchDemoService = async (req, res) => {
        try {
            const result = await DemoService.demoTest()
            return okResponse(res, result, 'Demo service successful !'); 
        } catch (error) {
            return internalServerError(res)
        }
    }    
}   

module.exports = DemoController