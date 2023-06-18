import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import initApp from './src/Modules/app.router.js'
import connecteDB from './DB/connection.js'
const app = express()
const port = 3000
initApp(app,express)
connecteDB().then(()=>{
    
    app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))
})

