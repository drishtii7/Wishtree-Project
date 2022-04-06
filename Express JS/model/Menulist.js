const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let Menulist=new Schema({
    fname:String,  //{    type:String  },
    description:String,  //{ type:String},
    price:Number  //{ type:Number }
    
  },{
      collection:'menulist'
  });

  module.exports=mongoose.model('Menulist',Menulist);