const env = {
    PORT: 3100,
    mysql: {   
        DB_HOST: '172.20.10.110',
        DB_PORT: '3306',
        DB_USER: 'adminsms',
        DB_PASS: '123456789',
        DB_NAME: 'sms',
        DB_DIALECT: 'mysql',
        DB_DRIVER: "mssql"
    },
    jwt : {
       JWT_KEY : 'create-sms-queue'
    }
}
module.exports = env