const express = require('express')
 const http=require('http')
const app=express()
const appConfig=require('./appConfig/config')
const bodyParser = require('body-parser')
const fs=require('fs')
const mongoose=require('mongoose')
const globalerror=require('./middlewares/errorhandler')
const routeLoggerMiddleware=require('./middlewares/routeLogger')
var helmet=require('helmet')
const logger=require('./libs/loggerLib')

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(routeLoggerMiddleware.logIp)
let route=('./routes')
fs.readdirSync(route).forEach(function(file){
    if(file.indexOf(".js")){
      let a= require( route+'/'+file)
      a.setrouter(app)
    }
})



let model=('./models')
fs.readdirSync(model).forEach(function(file){
    if(file.indexOf(".js")){
       require( model+'/'+file)
    
    }
})

app.use(globalerror.errorhandler)
app.use(globalerror.notFoundHandler)
const server=http.createServer(app)
server.listen(appConfig.port)
server.on('error',OnError)
server.on('listening',OnListening)

function OnError(error){
  if(error.syscall !=='listen'){
    logger.captureError(error.code+'not equal listen','serverOnErrorHandler',10)
    throw error
  }
  switch (error.code){
    case 'EACCES':
      logger.captureError(error.code+'elevated privilages required','serverOnErrorHandler',10)
  process.exit(1)
  break
  case 'EADDRINUSE':
      logger.captureError(error.code+'port is already in use','serverOnErrorHandler',10)
  process.exit(1)
  break
  default:
          logger.captureError(error.code+'some unknown error occured','serverOnErrorHandler',10)
     throw error
    }
}

function OnListening(){
  var addr=server.address()
  var bind=typeof addr === 'string'
  ? 'pipe'+ addr
  : 'port'+addr.port;
  ('listening on'+ bind)
  logger.captureInfo('server listening on port'+addr.port,'serverOnListeningHandler',10)
let db=mongoose.connect(appConfig.db.url,{useNewUrlParser:true})
}

process.on('unhandledRejection',(reason,p)=>{
  console.log('unhandled Rejection at: Promise',p,'reason:',reason)
})

mongoose.connection.on('error',function(err){
  console.log(err)
})
mongoose.connection.on('open',function(err){
  if(err){console.log(err)}
  else{console.log('database open')}
})