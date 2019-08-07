const response=require('../libs/responseLib')

let errorhandler=(err,req,res,next)=>{
    console.log(err)
    let apiResponse=response.generate(true," global level error",500,null)           

    res.send(apiResponse)
}

let notFoundHandler=(req,res,next)=>{
    let apiResponse=response.generate(true,'route not found',404,null)           
    res.status(404).send(apiResponse)
    
}

module.exports={
    errorhandler:errorhandler,
    notFoundHandler:notFoundHandler
}