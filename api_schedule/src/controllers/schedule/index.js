const pagination = require("../../utils/pagination");
const model = require("../../models");

exports.get = async function (req, res, next) {
  try {
    const {schedule} = req.query
    const queryListSchedule = `SELECT
                                    sc.id,
                                    sc.dnis,
                                    DATE_FORMAT(sc.schedule ,'%Y-%m-%d %H:%i') as schedule,
                                    sc.message
                                FROM schedule sc
                                WHERE DATE_FORMAT(sc.schedule, '%Y%m%d%H%i') = '${schedule}'`;
    const dataQueryListSchedule = await model.sequelize.query(
      queryListSchedule,
      {
        type: model.sequelize.QueryTypes.SELECT,
      }
    );

    res.data = {
      data: dataQueryListSchedule,
    };
    res.answerWith(200, "List Schedule");
  } catch (error) {
    next(error);
  }
};
