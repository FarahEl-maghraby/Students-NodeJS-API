const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

StudentsSchema = new mongoose.Schema({
    StudentId:{
        type:Number,
        default:0
    },
    name:{
        type:String,
        required:true,
        maxlength:50,
        minlength:2,
        trim:true
    },

    password:{
        type:String,
        required:true,
        minlength:5
    },

    sub1:{
        type:Number,
        maxlength:50,
        minlength:2,
        trim:true
    },

    sub2:{
        type:Number,
        maxlength:50,
        minlength:2,
        trim:true
    },

    sub3:{
        type:Number,
        maxlength:50,
        minlength:2,
        trim:true
    },

    total:{
        type:Number,
        default:0
    }



})

StudentsSchema.pre('save', async function(next){
const student = this
student.total = await(student.sub1 + student.sub2 + student.sub3)
student.password = await bcrypt.hash(student.password, 8)
next()
})

/*StudentsSchema.pre('update', async function(next){
    const student = this
    student.total = await(student.sub1 + student.sub2 + student.sub3)
    next()
    })*/

const Students = mongoose.model('Students',StudentsSchema)
module.exports = Students