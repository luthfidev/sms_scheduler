const model = require("../../models");

exports.post = async function (req, res, next) {
  const t = await model.sequelize.transaction();
  try {
    const {
        schedule_id, messageId, status,delivery_time
    } = req.body;
    let dataNotExist = [];

    const bodyData = [
      "schedule_id",
      "messageId",
      "status",
      "delivery_time",
    ];

    for (let i = 0; i < bodyData.length; i++) {
      if (req.body[bodyData[i]] && req.body[bodyData[i]] == null) dataNotExist.push(bodyData[i]);
    }

    if (dataNotExist.length > 0) {
      await t.commit();
      res.data = {
        data: dataNotExist,
      };
      return res.answerWith(400, "Data Required");
    }


    const createStatus = await model.status.create(
      {
        schedule_id: schedule_id,
        messageId: messageId,
        status: status,
        delivery_time: delivery_time,
      },
      {
        transaction: t,
      }
    );

    await t.commit();
    res.answerWith(200, "Status Created");
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
