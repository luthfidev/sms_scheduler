const cluster = require('node:cluster');
const process = require('node:process');
const redis = require('redis');
const envLocal = require('./env');
const _ = require('lodash');
const axios = require('axios');
const RedisSMQ = require("rsmq");

(async () => {
    const client = redis.createClient({
        url: `redis://${envLocal.redis.username}:${envLocal.redis.password}@${envLocal.redis.host}:${envLocal.redis.port}`
    });
    const rsmq = new RedisSMQ(
        {
            host: envLocal.redis.host,
            port: envLocal.redis.port,
            ns: envLocal.rsmq.ns,
            password: envLocal.redis.password,
            realtime: true
        }
    );
    try {
        if (cluster.isPrimary) {
            const subscriber = client.duplicate();
            await subscriber.connect();

            await subscriber.subscribe(envLocal.redis.chanel_exec_worker, async (messageSubcribe) => {
                let { id, dnis, message, respId } = JSON.parse(messageSubcribe);
                cluster.fork({
                    test: JSON.stringify({ id, dnis, message, respId })
                });
                // Fork workers.
                // for (let i = 0; i < numCPUs.length; i++) {
                //     cluster.fork({
                //         test: JSON.stringify({ id, dnis, message, respId })
                //     });
                // }

            });
        } else {
            // Worker
            let { id, dnis, message, respId } = JSON.parse(process.env.test);
            await client.connect();

            let test = await axios.post(`${envLocal.base_url}api`, {
                dnis,
                message
            });

            if (test.status == 200) {
                for (let i = 0; i < test.data.length; i++) {
                    let dataSend = {
                        id : id,
                        dnis: test.data[i].dnis,
                        message: test.data[i].message_id,
                        message_id: test.data[i].message_id
                    }
                    let rsmqSendMessage = await new Promise((resolve, reject) => {
                        rsmq.sendMessage({ qname: envLocal.rsmq.qnameCheckSMS, message: JSON.stringify(dataSend) }, function (err, resp) {
                            if (err) {
                                reject(err);
                            }
                            resolve(resp);
                        });
                    });
                }
            }
            await client.disconnect();
            process.kill(process.pid);
        }
    } catch (error) {
        console.log(error)
    }
})()
