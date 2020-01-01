const express = require('express')
const router = express.Router()
const Students = require('./../models/student')

//POST DATA 

router.post('/students' , (req,res)=>{
const studnet = new Students(req.body)
Students.findOne({},{},{sort: {'StudentId':-1}} , function(err,single){

    try{
        StudentId = single.StudentId +1
    }
    catch{
        StudentId =1;
    } 

    studnet.StudentId = StudentId
  
    studnet.save()
    .then(() => res.status(200).send(studnet))
    .catch((error) => res.status(400).send(error.message)) 

}) 
})




//GET ALL

router.get('/students',(req,res)=>{
    
    Students.find({})
    .then((student) =>{
        if(!student)
        res.send('Can not fetch data')
        res.send(student)
    })
    .catch((error)=>res.send(error.message))
})

/*
//GET BY SEPECIFIC OBJECT ID

router.get('/students/:id',(req,res)=>{
    const id = req.params.id
     Students.findById(id)
    .then((student) =>{
        if(!student)
        res.send('Error')
        res.send(student)
    })
    .catch((error) => res.send(error.message))

})*/

//GET BY MY OWN ID
router.get('/students/:StudentId',(req,res)=>{
    const id = req.params.StudentId
     Students.findOne({StudentId:id}, function(err,single){
        if(err){
            console.log(err);
            return
        }
     })
    .then((student) =>{
        if(!student)
        res.send('Error it might be deleted')
        student.total = student.sub1 + student.sub2 + student.sub3
        res.send(student)
    })
    .catch((error) => res.send(error.message))

})

router.patch('/students/:id', async(req,res)=>{

   /* const updates = Object.keys(req.body)
    const allowed = ['sub1','sub2','sub3']
    const isValid = updates.every((updates) => allowed.includes(updates))
    if(!isValid)
    res.send('You can\'t update this data')*/
    try{
        const student = await Students.findOneAndUpdate(
          {StudentId:req.params.id},req.body,{new:true , runValidators:true})
        if(!student)
        res.send('No data')
        student.total = student.sub1 + student.sub2 + student.sub3
        res.send(student)

    }
 
    catch(e){
        res.send(e.message)
    } 
 })

 //DELETE ALL 

 router.delete('/students',(req,res)=>{
     Students.deleteMany({})
     .then((student) => {
         if(!student)
         res.send('Error')
         res.send('All your data all deleted')
     })
     .catch((err)=> res.send(err.message))
 })

 //DELETE STUDENTS BY ID
 
 router.delete('/students/:id',async (req,res)=>{
const student = await Students.findByIdAndDelete(req.params.id,req.body)
try{
    if(!student)
    res.send('Can\'t delete')
    res.send('Delted')
}
catch(e)
{
    res.send(e.message)
}
 })
module.exports = router