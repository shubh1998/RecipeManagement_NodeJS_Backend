class DemoService {
    static async demoTest() {
        try {
            const promiseResult = new Promise((res, rej) => {
                res('DemoService: Everything is working fine with routing setup')
            }) 
            return promiseResult
        } catch (err) {
            console.log("Error in DemoService : ", err);
            return err
        }
    }
} 

module.exports = DemoService