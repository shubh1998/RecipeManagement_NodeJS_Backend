require('./db/index.js');
require("./globals/index.js");
const cors = require('cors')
const express = require('express')
const { PORT } = require('./constants')

const app = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    cors({
      credentials: true,
      origin: (origin, callback) => callback(null, true),
    })
  );

// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
})

//---------Assign all routes to a single variable-------------------
const apiRoutes = require("./routes/index");

// Register our REST API Routes.
app.use('/api/v1', apiRoutes)

app.get('/hello-world', (req, res) => {
    return okResponse(res, null, 'Hello Dev, Here is your hello world and everything is working fine.')
})

app.use(function (req, res, next) {
    return notFoundError(res, "End point you requested not found !")
});

app.listen(PORT, () => {
    console.log('Server starts listening on port : ' + PORT)
})