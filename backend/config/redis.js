import {createClient} from 'redis';
import {env} from './env.js';
let client=null;
export async function connectRedis(){
 if(!env.redisUrl){
    console.log('Redis disabled (REDIS_URL not set)');
    return null;}

 client=createClient({url:env.redisUrl});

  client.on('error',e=>console.error('Redis error:',e.message));

 await client.connect(); console.log('Redis connected'); return client;

}
export function getRedis(){return client;}
export async function cacheGet(key){
    try{if(!client?.isReady)
        return null;const v=await client.get(key);
        return v?JSON.parse(v):null;
    }catch{return null;

    }}
export async function cacheSet(key,value,ttl=60){
    try
    {if(client?.isReady)
        await client.set(key,
            JSON.stringify(value),
        {EX:ttl});}catch{}}

export async function cacheDel(key){
    try{if(client?.isReady)
        await client.del(key);
    }catch{

    }};
 