const RedisSMQ = require("rsmq");
const redis = require('redis');
const envLocal = require('./env');


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
        const subscriber = client.duplicate();
        await subscriber.connect();
        let createQueue = await new Promise((resolve, reject) => {
            rsmq.createQueue({ qname: envLocal.rsmq.qname }, function (err, resp) {
                if (err) {
                    return resolve('OK');
                }

                if (resp === 1) {
                    resolve(resp);
                }
            });
        });

        let setUpVT = await new Promise((resolve, reject) => {
            rsmq.setQueueAttributes({ qname: envLocal.rsmq.qname, vt: "0" }, function (err, resp) {
                if (err) {
                    return reject(err);
                }
                resolve('OK');
            });
        })

        console.log(setUpVT, 'setUpVT');

        await subscriber.subscribe(envLocal.redis.chanel_create, async (message) => {
            let rsmqSendMessage = await new Promise((resolve, reject) => {
                rsmq.sendMessage({ qname: envLocal.rsmq.qname, message: message }, function (err, resp) {
                    if (err) {
                        resolve('OK');
                    }
                    resolve(resp);
                });
            });
        });

        setInterval(async () => {
            let getQueue = await new Promise((resolve, reject) => {
                rsmq.receiveMessage({ qname: envLocal.rsmq.qname }, async function (err, respRecieve) {
                    if (err) {
                        reject(err);
                        return
                    }
                    if (respRecieve.id) {
                        console.log(respRecieve.id)
                        let { id, dnis, message } = JSON.parse(respRecieve.message)
                        await client.connect();
                        await client.publish(envLocal.redis.chanel_exec_worker, JSON.stringify({ id, dnis, message, respId: respRecieve.id }));
                        await client.disconnect();
                        let deleteQueue = await new Promise((resolve, reject) => {
                            rsmq.deleteMessage({ qname: envLocal.rsmq.qname, id: respRecieve.id }, function (err, respDelete) {
                                if (err) {
                                    reject(err);
                                }
                                if (respDelete === 1) {
                                    resolve({
                                        id: id,
                                        message: message,
                                        delete: true
                                    })
                                }
                            });
                        });
                        console.log(deleteQueue, 'DELETE QUEUE');
                        resolve(respRecieve.id);
                    } else {
                        resolve({
                            id: null,
                            message: 'Queue Empty'
                        })
                    }
                });
            });
            // console.log(getQueue);
        }, 1000);

    } catch (error) {
        console.log(error)
        await client.disconnect();
    }
})()
