const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});




    (async ()=>{
        try{
            await redisClient.connect();
            redisClient.on('error',(err) =>{
            console.error("Redis connection error:",err);
})   
            console.log("Redis Connected...");
        }catch(err){
            console.log("Error while connecting redis",err)
        }
    })()

module.exports= redisClient;