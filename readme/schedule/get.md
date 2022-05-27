# Show List Contact

**URL** : `/schedule?schedule=yyyymmddhhmm`
**example** : `/schedule?schedule=202205270858`

**Method** : `GET`

**Data constraints** : `{}`

## Success Responses

**Code** : `200 OK`


```json

   {
    "status": "200",
    "success": true,
    "message": "List Schedule",
    "data": [
        {
            "id": 34,
            "dnis": "6111111111111,633322222,600111111111",
            "schedule": "2022-05-27 08:58",
            "message": "test"
        }
    ],
    "meta": {
        "startAt": "2022-05-27T08:58:03.942+07:00",
        "finishedAt": "2022-05-27T08:58:03.947+07:00",
        "duration": "5ms",
        "requestId": "41ce9725-e838-4821-a376-e93fafda6397",
        "ipAddress": "::ffff:172.20.10.1"
    }
}
```