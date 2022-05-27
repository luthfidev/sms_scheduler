# API sms scheduler Microservice Docker

    http://localhost:3100

***

## Dependencies API sms scheduler

* Node Js
* Express Js
* cors
* express-auto-routes
* express-bearer-token
* fs
* helmet
* moment
* morgan-body
* mysql2
* path
* sequelize
* uuid

## Dependencies Queue Consumer

* Node Js
* redis
* rsmq

## Dependencies Queue Consumer-checker

* Node Js
* axios
* rsmq

## Dependencies Queue Producer

* Node Js
* axios
* moment
* redis
* rsmq

## Dependencies Queue Schedule

* Node Js
* axios
* bree
* moment
* redis

## Dependencies Queue Worker

* Node Js
* axios
* lodash
* redis
* rsmq

  
***

## Installing

Clone the repo, install dependencies, and start the API server locally.

```shell
git clone https://github.com/luthfidev/sms_scheduler.git
docker-compose up -d
```
***


## API End Point
### SCHEDULE
* [CREATE SCHEDULE](readme/schedule/post.md) : `POST /schedule/PostSchedule`
* [LIST SCHEDULE](readme/schedule/get.md) : `GET /schedule?schedule=202205262341`

### STATUS
* [CREATE STATUS](readme/status/post.md) : `POST /status/PostStatus`
* [LIST STATUS](readme/status/get.md) : `GET /status`

