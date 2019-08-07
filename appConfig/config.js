appConfig={}

appConfig.port=3000
appConfig.allowedCorsOrgin="*"
appConfig.env="dev"
appConfig.db={
    url:'mongodb://127.0.0.1:27017/blogAppDB'
}
appConfig.apiVersion='/api/v1'

module.exports={
    port:appConfig.port,
    db:appConfig.db,
    v:appConfig.apiVersion
}