const mongoose=require('mongoose')
const Schema=mongoose.Schema

let blogSchema= new Schema(
    {
        blogId:{
            type:String,
            default:'',
            unique:true
        },
        title:{
            type:String,
            default:''

        },
        description:{
            type:String,
            default:''

        },
        author:{
            type:String,
            default:''

        },
        bodyHtml:{
            type:String,
            default:''

        },
        views:{
            type:Number,
            default:0

        },
        isPublished:{
            type:Boolean,
            default:false
        },
        category:{
            type:String,
            default:''

        },
        publishedOn:{
            type:Date,
            default:Date.now

        },
        editedOn:{
            type:Date,
            default:Date.now

        }
    }
)
mongoose.model('blog',blogSchema)