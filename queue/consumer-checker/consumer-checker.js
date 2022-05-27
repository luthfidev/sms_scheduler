const RedisSMQ = require("rsmq");
const envLocal = require('./env');
const axios = require('axios');

(async () => {

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

        let createQueue = await new Promise((resolve, reject) => {
            rsmq.createQueue({ qname: envLocal.rsmq.qnameCheckSMS }, function (err, resp) {
                if (err) {
                    return resolve('OK');
                }

                if (resp === 1) {
                    resolve(resp);
                }
            });
        });

        let setUpVT = await new Promise((resolve, reject) => {
            rsmq.setQueueAttributes({ qname: envLocal.rsmq.qnameCheckSMS, vt: "0" }, function (err, resp) {
                if (err) {
                    return reject(err);
                }
                resolve('OK');
            });
        })

        console.log(setUpVT, 'setUpVT');

        setInterval(async () => {
            let getQueue = await new Promise((resolve, reject) => {
                rsmq.receiveMessage({ qname: envLocal.rsmq.qnameCheckSMS }, async function (err, respRecieve) {
                    if (err) {
                        reject(err);
                        return
                    }
                    if (respRecieve.id) {
                        let { id, message_id } = JSON.parse(respRecieve.message)

                        let test = await axios.get(`${envLocal.base_url}api`, {
                            params: {
                                messageId: message_id
                            }
                        })
                        if (test.data.status !== 'ACCEPTD') {
                            let createDetailSMS = axios.post(`${envLocal.axios.http}/status/PostStatus`, {
                                schedule_id: id,
                                messageId: message_id,
                                status: test.data.status,
                                delivery_time: test.data.delivery_time
                            });
                            console.log(createDetailSMS, 'DETAIL SMS')
                            let deleteQueue = await new Promise((resolve, reject) => {
                                rsmq.deleteMessage({ qname: envLocal.rsmq.qnameCheckSMS, id: respRecieve.id }, function (err, respDelete) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (respDelete === 1) {
                                        resolve('DELETED')
                                    }
                                });
                            });
                            console.log(deleteQueue, 'deleteQueue')
                        } else {
                            console.log(test.data)
                            console.log('MASUK SINI KAN 2')
                            let changeVt = await new Promise((resolve, reject) => {
                                rsmq.changeMessageVisibility({ qname: envLocal.rsmq.qnameCheckSMS, vt: "30", id: respRecieve.id }, function (err, resp) {
                                    if (err) {
                                        reject(error);
                                    }
                                    if (resp === 1) {
                                        console.log("message hidden for 30 seconds");
                                        resolve('HIDDEN');
                                    }
                                });
                            })
                            console.log(changeVt, 'CHANGE VT');
                        }
                    } else {
                        resolve({
                            id: null,
                            message: 'Queue Empty'
                        })
                    }
                });
            });
            console.log(getQueue);
        }, 1000);

    } catch (error) {
        console.log(error)
        await client.disconnect();
    }
})()
