//import
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt')

//configuration
const app = new express();
app.use(express.json());
app.use(cors());

const client = new MongoClient('mongodb+srv://adminB:adminB@cluster0.mozznvh.mongodb.net/?retryWrites=true&w=majority&appName=cluster0');
client.connect();
const db = client.db('bus_reservation');
const col = db.collection('details');



app.get('/home',(req,res)=>{
    res.send("Home page");
})


 
app.post('/insert', (req,res)=>{ 
    console.log(req.body); 
    col.insertOne(req.body); 
    res.send("successfully submitted"); 
}) 
 
app.post('/check',async(req,res)=>{ 
    const result1 = await col.findOne({'name':req.body.un}); 
    
    if(result1.password == req.body.pw){ 
        res.send("Login Success") 
 
    } 
    else{ 
        res.send("Login Failed") 
    } 
}) 
app.post('/delete',async(req,res)=>{
    const result3 = await col.findOne({'name':req.body.un});
   
    if(result3.name == req.body.un ){
        if(result3.password == req.body.pw ){
            col.deleteOne({password:req.body.pw})
        res.send("deleted")
    }}
        
        else{
        res.send("Failed")
    }
})


app.post('/update',async(req,res)=>{
    const result2 = await col.findOne({'name':req.body.un});
   
    if(result2.name == req.body.un){
        if(result2.password == req.body.pw){
            col.updateOne({password:req.body.pw},{$set:{password:req.body.pwd}})
            res.send("Update success");
          }  }
    else{
        res.send("Update Failed")
    }
})




app.get('/showall',async(req,res)=>{
    const result = await col.find().toArray();
    res.send(result);
})





app.listen(1234);
console.log("Server Running....");

