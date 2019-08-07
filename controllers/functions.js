const express = require('express')
const app = express()
const mongoose = require('mongoose')
const model = require('../models/models')
const BlogModel = mongoose.model('blog')
const shortid = require('shortid')
const response = require('../libs/responseLib')
const time= require('../libs/timeLib')
const check=require('../libs/checkLib')
const logger=require('../libs/loggerLib')

let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .exec((err, result) => {
            if (err) {
                logger.captureError('error','getAllBlog:error',10)
                let apiResponse = response.generate(true, 'failed to find', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'failed to find', 404, null)

                res.send(apiResponse)
            } else {
                logger.captureInfo('blog found','getAllblog:success',0)
                let apiResponse = response.generate(false, 'blog found', 200, result)
                res.send(apiResponse)
            }
        })
}

let viewOne = (req, res) => {
    BlogModel.findOne({ 'blogId': req.params.blogid })
        .exec((err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'failed to find', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'blog not found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'blog found', 200, result)
                res.send(apiResponse)
            }
        })
}


let viewAuthor = (req, res) => {
    BlogModel.findOne({ 'blogId': req.params.author },
        (err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'failed to find', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'blog not found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'blog found', 200, result)
                res.send(apiResponse)
            }
        })
}


let viewCategory = (req, res) => {
    BlogModel.findOne({ 'blogId': req.params.category },
        (err, result) => {
            if (err) {
                console.log(err)
                let apiResponse = response.generate(true, 'failed to find', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'blog not found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'blog found', 200, result)
                res.send(apiResponse)
            }
        })
}

let create = (req, res) => {
    let today = time.now()
    let blogId = shortid.generate()

    let datamodel = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        blogHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        publishedOn: today,
        editedOn: today
    })
    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    datamodel.tags = tags

    datamodel.save((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'failed to find', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'blog not found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'blog found', 200, result)
            res.send(apiResponse)
        }
    })
}

let views = (req, res) => {
    BlogModel.findOne({ 'blogId': req.params.blogid }, (err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'failed to find', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'blog not found', 404, null)
            res.send(apiResponse)
        } else {
            result.views += 1
            result.save((err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'failed to find', 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'blog not found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'blog found', 200, result)
                    res.send(apiResponse)
                }
            })
        }
    })
}


let edit = (req, res) => {
    let options = req.body;
    BlogModel.update({ 'blogId': req.params.blogid }, options, { multi: true })
        .exec(
            (err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'failed to find', 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'blog not found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'blog found', 200, result)
                    res.send(apiResponse)
                }
            }
        )
}
let deleted = (req,res)=>{
    BlogModel.remove({'blogId':req.params.blogId},(err,result)=>{
        if(err){
            let apiResponse=response.generates(true,'error',500,null) 
            res.send(apiResponse)
        } else if (checkout.isEmpty(result)){
            let apiResponse=response.generates(true,'no blog found',404,null) 
            res.send(apiResponse)
        }else {
            let apiResponse=response.generates(false,'Success',200,result) 
    res.send(apiResponse)
        }
        })
}





module.exports = {
    getAllBlog: getAllBlog,
    viewOne: viewOne,
    viewAuthor: viewAuthor,
    viewCategory: viewCategory,
    create: create,
    edit: edit,
    views: views,
    deleted:deleted

}

