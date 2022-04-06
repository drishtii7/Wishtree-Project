const express=require('express');

// here we using express and route

const app=express();
const menuRoute=express.Router();



let menuModel=require('../model/Menulist');



menuRoute.route('/').get(function(req,res){
     
    menuModel.find(function(err,menudata){
         if(err) 
            throw console.log("error in controller",err);
         else
            res.json(menudata);

     })
 })


// // To add New Product List

menuRoute.route('/addList').post(function(req,res){
    
     let fdetail=new menuModel(req.body);
     console.log(req.body);
     fdetail.save()
     .then(game=>{res.status(200).json({'fdetail':'List Added Successfully'})})
     .catch(err=>{res.status(400).send("Someting went wrong ....")})
})



menuRoute.route('/editList/:id').get(function(req,res){
     let id=req.params.id;
     menuModel.findById(id,function(err,menudata){

         res.json(menudata);
     })
})



menuRoute.route('/updateList/:id').put(function(req,res){
    menuModel.findById(req.params.id,function(err,menudata){
             if(!menudata)//null   
             {
                 return next(new Error('Unable to find List'));
             }else
             {
                menudata.fname=req.body.fname;
                menudata.description=req.body.description;
                menudata.price=req.body.price;
                menudata.save()
                 .then(  emp=>{  res.json("List Updated Sucessfully.")})
                 .catch(err=>{  res.status(400).send("Unable to Update List")})
             }
        })
})



menuRoute.route('/deleteList/:id').delete(function(req,res){
    menuModel.findByIdAndRemove({_id:req.params.id},function(err,menudata){
          if(err) 
              res.json(err)
          else  
              res.json('List Deleted Successfully..')
     })
})

// exporting controller

module.exports=menuRoute;