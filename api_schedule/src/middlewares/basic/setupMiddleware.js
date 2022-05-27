const moment = require('moment');
const uuid = require('uuid');

module.exports = function (req, res, next) {
    req.connection.setTimeout(3600 * 1000);
    req.ipAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.requestId = uuid.v4();
    req.requestTime = moment();
    // req.bugSnag = bugSnagClient;
    // req.logger = logger(req.requestId);
    res.data = {};
    res.answerWith = function (status, message) {
        let token = res.data.token ? res.data.token : null
        const endTime = moment();
        const duration = moment.duration(endTime.diff(req.requestTime));
        const timeFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ";
        //Function Audit
        res.status(status);
        if (token !== null) {
            res.json({
                status: status.toString(),
                success: status.toString() == 200 ? true : false,
                message: message,
                data: res.data.data,
                pageInfo: res.data.pageInfo,
                token: token,
                meta: {
                    startAt: req.requestTime.format(timeFormat),
                    finishedAt: endTime.format(timeFormat),
                    duration: duration.asMilliseconds() + "ms",
                    requestId: req.requestId,
                    ipAddress: req.ipAddress
                }
            })
        } else {
            res.json({
                status: status.toString(),
                success: status.toString() == 200 ? true : false,
                message: message,
                data: res.data.data,
                pageInfo: res.data.pageInfo,
                // newToken: res.newToken ? res.newToken : null,
                meta: {
                    startAt: req.requestTime.format(timeFormat),
                    finishedAt: endTime.format(timeFormat),
                    duration: duration.asMilliseconds() + "ms",
                    requestId: req.requestId,
                    ipAddress: req.ipAddress
                }
            })
        }
    };
    next();
};
