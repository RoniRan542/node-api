const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
// const path = require('path')
// const absolute = path.resolve(__dirname);
// console.log(absolute)
// const os = require('os')
// const currentOs = {
//     name: os.type(),
//     user: os.userInfo(),
//     uptime: os.uptime(),
//     release: os.release(),
//     totalMem: os.totalmem(),
//     freeMem: os.freemem()
// }
// console.log(currentOs);

dotenv.config()

// db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB connected!")
})

mongoose.connection.on("error", err => {
    console.log(`DB Connection error: ${err.message}`);
});
// take in routes
const postRoutes = require('./routes/post')




// middleware:
app.use(morgan("dev"));
app.use(bodyParser.json());// any request with a 'body' will be parssed to json format
app.use(expressValidator());
app.use('/', postRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`listening on port: ${port}`)});