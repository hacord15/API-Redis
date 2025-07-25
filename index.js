const express = require('express');
const app = express();
const PORT = 9090;
const redisClient = require('./redisClient')


app.get('/ping',(req,res)=>{
    res.send("pong")
})

const redisCache = async(req,res,next) =>{
    try{
        const data  = await redisClient.get('products');
        if(data){
            console.log("Cache Hit ");
            res.status(200).json(data);
        } else{
            console.log('Cache MIss');
            next();
        }
    }catch(err){
        throw err;
    }
}

app.get("/products",redisCache,async(req,res)=>{
    try{
        const api = "https://fakestoreapi.com/products";
        const result = await fetch(api);
        const data = await result.json();
        await redisClient.set('products',JSON.stringify(data),{PX:5000}); //TTL - time to leave  
        res.status(200).json(data);
    } catch(err){
        res.status(500).json({message:"something galat ja rha h , dobara try kreein"});
    }
})
app.listen(PORT ,()=>{
    console.log(`server is runnign ${PORT}`)
})