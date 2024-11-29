const mongoose = require("mongoose")
const { type } = require("os")


const todoSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true, 
        },
        email: {
            type: String,
            required: true, 
            unique: true,  
        },
        password: {
            type: String,
            required: true, 
        },
        tasks: [
            {
                taskName: {
                    type: String,
                    required: true,
                },
                completed: {
                    type: Boolean,
                    default: false, 
                },
            },
        ],
    },
    { timestamps: true } 
);

module.exports= new mongoose.model("todo",todoSchema)