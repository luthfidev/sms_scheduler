# Show List Contact

**URL** : `/status`
**example pagination** : `/status/?schedule_id&messageId&status=UNKNOWN&search`

**Method** : `GET`

**Data constraints** : `{}`

## Success Responses

**Code** : `200 OK`


```json
{
    "status": "200",
    "success": true,
    "message": "List Status",
    "data": [
        {
            "id": 30,
            "dnis": "6111111111111,633322222,600111111111",
            "message": "test",
            "schedule_id": "34",
            "messageId": "b74c883d-30ac-429e-883a-5e16de1efae7",
            "status": "UNKNOWN"
        },
        {
            "id": 31,
            "dnis": "6111111111111,633322222,600111111111",
            "message": "test",
            "schedule_id": "34",
            "messageId": "ba2b27b4-2628-41a5-9fbd-b8e6e124d614",
            "status": "UNKNOWN"
        },
        {
            "id": 32,
            "dnis": "6111111111111,633322222,600111111111",
            "message": "test",
            "schedule_id": "34",
            "messageId": "c34710f8-ccfd-429b-9c93-cf0ca08c3649",
            "status": "DELIVRD"
        }
    ],
    "pageInfo": {
        "page": 1,
        "limit": 25,
        "offset": 0,
        "totalPage": 1,
        "totalData": 3
    },
    "meta": {
        "startAt": "2022-05-27T09:01:58.873+07:00",
        "finishedAt": "2022-05-27T09:01:58.948+07:00",
        "duration": "75ms",
        "requestId": "73bc30c2-a998-49e5-8e6b-9d882446fbbc",
        "ipAddress": "::ffff:172.20.10.1"
    }
}
```

## Success Responses Data Null

**Code** : `200 OK`


```json
{
    "status": "200",
    "success": true,
    "message": "List Status",
    "data": [],
    "pageInfo": {
        "page": 1,
        "limit": 25,
        "offset": 0,
        "totalPage": 1,
        "totalData": 0
    },
    "meta": {
        "startAt": "2022-05-27T09:01:58.873+07:00",
        "finishedAt": "2022-05-27T09:01:58.948+07:00",
        "duration": "75ms",
        "requestId": "73bc30c2-a998-49e5-8e6b-9d882446fbbc",
        "ipAddress": "::ffff:172.20.10.1"
    }
}
```

## Success Responses with pagination

**Code** : `200 OK`


```json
{
    "status": "200",
    "success": true,
    "message": "List Status",
    "data": [
        {
            "id": 30,
            "dnis": "6111111111111,633322222,600111111111",
            "message": "test",
            "schedule_id": "34",
            "messageId": "b74c883d-30ac-429e-883a-5e16de1efae7",
            "status": "UNKNOWN"
        },
        {
            "id": 31,
            "dnis": "6111111111111,633322222,600111111111",
            "message": "test",
            "schedule_id": "34",
            "messageId": "ba2b27b4-2628-41a5-9fbd-b8e6e124d614",
            "status": "UNKNOWN"
        }
    ],
    "pageInfo": {
        "page": 1,
        "limit": 25,
        "offset": 0,
        "totalPage": 1,
        "totalData": 2
    },
    "meta": {
        "startAt": "2022-05-27T09:07:25.866+07:00",
        "finishedAt": "2022-05-27T09:07:25.900+07:00",
        "duration": "34ms",
        "requestId": "8f9e010d-7a8c-4c67-bec9-4d478573ec6d",
        "ipAddress": "::ffff:172.20.10.1"
    }
}
```