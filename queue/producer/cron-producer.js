const RedisSMQ = require("rsmq");
const redis = require('redis');
const envLocal = require('./env');
const axios = require('axios');
const moment = require('moment');
(async () => {
    try {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const client = redis.createClient({
            url: `redis://${envLocal.redis.username}:${envLocal.redis.password}@${envLocal.redis.host}:${envLocal.redis.port}`
        });
        await client.connect();
        console.log(moment().format('YYYY-MM-DD HH:mm'))
        let getSchedulle = await axios.get(`${envLocal.axios.http}/schedule`, {
            params: {
                schedule: moment().format('YYYY-MM-DD HH:mm')
            }
        })
        if (getSchedulle.status == '200') {
            let data = getSchedulle.data.data;
            for (let i = 0; i < data.length; i++) {
                await sleep(50);
                console.log('publish')
                await client.publish(envLocal.redis.chanel_create, JSON.stringify(data[i]));
            }
        }
        await client.disconnect();
    } catch (error) {
        console.log(error)
    }
})()