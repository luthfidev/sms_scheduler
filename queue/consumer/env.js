const config = {
    axios: {
        http: 'http://172.20.10.111:3100'
    },
    rsmq: {
        ns: 'rx',
        qname: 'sms',
        qnameCheckSMS: 'check-sms'
    },
    redis: {
        chanel_create: 'create-sms-queue',
        chanel_exec_worker: 'send-sms-worker',
        chanel_worker_success: 'success-worker',
        chanel_worker_not_sucess: 'not_success-worker',
        host: '172.20.10.2',
        username: 'default',
        password: '123456789',
        port: 6379
    },
    base_url: 'http://kr8tif.lawaapp.com:1338/',
}
module.exports = config