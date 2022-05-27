const model = require("../../models");

exports.post = async function (req, res, next) {
  const t = await model.sequelize.transaction();
  try {
    const {
     schedule, dnis, message,
    } = req.body;
    let dataNotExist = [];

    const bodyData = [
      "schedule",
      "dnis",
      "message",
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


    const createSchedule = await model.schedule.create(
      {
        schedule: schedule,
        dnis: dnis,
        message: message,
      },
      {
        transaction: t,
      }
    );
    res.data = {
      data: createSchedule,
    };

    await t.commit();
    res.answerWith(200, "Scedule Created");
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
