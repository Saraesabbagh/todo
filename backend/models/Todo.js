const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title for your Todo is Required"],
        text: true, 
    },
    description:{
        type: String,
        required: false,
        text: true, 
    },
    deadlineYear:{
        type: Number,
        required: true,
        trim: true, 
    },
    deadlineMonth:{
        type: Number,
        required: true,
        trim: true, 
    },
    deadlineDay:{
        type: Number,
        required: true,
        trim: true, 
    },
    done:{
        type: Boolean,
        default: false, 
    },
    search:[
        {
            todo:{
                type:mongoose.Schema.ObjectId,
                ref:'Todo'
            }
        }
    ]
    
})

module.exports= mongoose.model('Todo', todoSchema );