const logger=require('../libs/loggerLib')
const response=require('../libs/responseLib')
let auth=(req,res,next)=>{
if(req.params.authToken||req.query.authToken||req.header('authToken')){
if(req.params.authToken=="Admin"||req.query.authToken=="Admin"||req.header('authToken')=="Admin"){
    req.user={fullname:"Bejo",userId:'Jeffrin'}
    next()
}
else{
    logger.captureError('AuthToken missing','Authentication middleware',403)
    let apiResponse=response.generate(true,'Auth token missing',403,null)
    res.send(apiResponse)
}
}
else{
    logger.captureError('AuthToken missing','Authentication middleware',403)
    let apiResponse=response.generate(true,'Auth token missing',403,null)
    res.send(apiResponse)
}}

module.exports={
    auth:auth
}