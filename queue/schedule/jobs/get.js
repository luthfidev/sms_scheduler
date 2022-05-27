const process = require('process');
const { parentPort } = require('worker_threads');
const axios = require('axios');
const redis = require('redis');
const moment = require('moment');
const envLocal = require('../env');

let isCancelled = false;


if (parentPort) {
    console.log('MASUK SINI');
    parentPort.once('message', (message) => {
        if (message === 'cancel') isCancelled = true;
    });
}

(async () => {
    try {
        const client = redis.createClient({
            url: `redis://${envLocal.redis.username}:${envLocal.redis.password}@${envLocal.redis.host}:${envLocal.redis.port}`
        });
        await client.connect();
        let dateMoment = moment().format('YYYYMMDDHHmm');
        let getSchedulle = await axios.get(`${envLocal.axios.http}/schedule`, {
            params: {
                schedule: dateMoment
                // schedule: '2022-05-25 18:15'
            }
        })
        console.log(getSchedulle.data, 'dataaa');
        if (getSchedulle.status == '200') {
            let data = getSchedulle.data.data;
            for (let i = 0; i < data.length; i++) {
                console.log('publish')
                await client.publish(envLocal.redis.chanel_create, JSON.stringify(data[i]));
            }
        }
        await client.disconnect();

        if (parentPort) parentPort.postMessage('done');
        else process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
})();