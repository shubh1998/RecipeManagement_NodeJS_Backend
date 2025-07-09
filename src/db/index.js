const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/CookieRecipeManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected Successfully !')
}).catch((err) => {
    console.log('DB Connection failed !', err)
});