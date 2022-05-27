# Create Status

used to enter the application

**URL** : `/schedule/PostSchedule`

**Method** : `POST`

**Data constraints**

```json
{
    "scedule_id": "[dnis in integer]",
    "messageId": "[message in plain text]",
    "status": "[status in plain text]"
}
```

**Data example**

```json
{
    "status": "200",
    "success": true,
    "message": "Status Created",
    "meta": {
        "startAt": "2022-05-27T09:05:04.966+07:00",
        "finishedAt": "2022-05-27T09:05:04.981+07:00",
        "duration": "15ms",
        "requestId": "ba5b406c-b11f-4a5a-80be-2ec980bd58af",
        "ipAddress": "::ffff:172.20.10.1"
    }
}
```

## Success Response

**Code** : `200 OK`
