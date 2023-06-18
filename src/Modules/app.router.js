import connecteDB from '../../DB/connection.js'
import AuthRouter from './Auth/Auth.router.js'
import MessageRouter from './Message/Message.router.js'
import UserRouter from './User/User.router.js'

const initApp = (app,express) => {
    app.use(express.json())
    app.get('/',(req,res)=>{
        return res.send('hiii!')
    })

    app.use('/auth', AuthRouter)
    app.use('/message',MessageRouter)
    app.use('/user', UserRouter)
    app.use('/*',(req,res)=>{

        return res.json({message:'page not found'})
    })

}
export default initApp