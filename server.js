const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')
dotenv.config()


const db = process.env.DATABASE_URL
mongoose.connect(db).then(()=>{
    console.log(`Database Connected Successfully.`);
}).catch(err=>{
    console.log(`Database Not Connected. Error: ${err}`);
})




const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}...`);
})