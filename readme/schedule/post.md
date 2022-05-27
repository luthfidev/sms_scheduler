# Create Schedule

used to enter the application

**URL** : `/schedule/PostSchedule`

**Method** : `POST`

**Data constraints**

```json
{
    "dnis": "[dnis in plain text]",
    "message": "[message in plain text]",
    "schedule": "[DATE TIME] or [2022-05-27 07:56]"
}
```

**Data example**

```json
{
    "status": "200",
    "success": true,
    "message": "Scedule Created",
    "data": {
        "id": 34,
        "schedule": "2022-05-27 08:58",
        "dnis": "6111111111111,633322222,600111111111",
        "message": "test",
        "updated_at": "2022-05-27T01:56:19.686Z",
        "created_at": "2022-05-27T01:56:19.686Z"
    },
    "meta": {
        "startAt": "2022-05-27T08:56:19.677+07:00",
        "finishedAt": "2022-05-27T08:56:19.735+07:00",
        "duration": "58ms",
        "requestId": "0b6a5b35-7f06-4c10-ae27-0512691c6cb2",
        "ipAddress": "::ffff:172.20.10.1"
    }
}
```

## Success Response

**Code** : `200 OK`
