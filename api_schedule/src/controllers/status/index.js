const pagination = require("../../utils/pagination");
const model = require("../../models");

exports.get = async function (req, res, next) {
  try {
    const {
      page,
      limit,
      id,
      schedule_id,
      messageId,
      status,
      search
    } = req.query;

    let queryId = "";
    let queryScheduleId = "";
    let queryMessageId = "";
    let queryStatus = "";
    let querySearch = "";

    if (id) {
      queryId = ` AND s.id = ${id}`;
    }
    if (schedule_id) {
      queryScheduleId = ` AND s.schedule_id LIKE '%${schedule_id}%' `;
    }
    if (status) {
      queryStatus = ` AND s.status LIKE '%${status}%' `;
    }
    if (messageId) {
      queryMessageId = ` AND s.messageId LIKE '%${messageId}%' `;
    }
    if (search) {
      querySearch = `AND (s.status LIKE '%${search}%' OR s.messageId LIKE '%${search}%')`;
    }

    const queryCount = `SELECT
                                COUNT (s.id) AS Total
                            FROM status s
                            LEFT JOIN schedule sc ON sc.id = s.schedule_id 
                            WHERE s.id != 0
                                ${queryId}
                                ${queryScheduleId}
                                ${queryMessageId}
                                ${queryStatus}
                                ${querySearch}`;

    const countQuery = await model.sequelize.query(queryCount, {
      type: model.sequelize.QueryTypes.SELECT,
    });

    let paginationUtils = pagination(page, limit, countQuery[0].Total);

    const queryListStatus = `SELECT
                                    s.id,
                                    sc.dnis,
                                    sc.message, 
                                    s.schedule_id,
                                    s.messageId,
                                    s.status
                                FROM status s
                                LEFT JOIN schedule sc ON sc.id = s.schedule_id  
                                WHERE s.id != 0
                                    ${queryId}
                                    ${queryScheduleId}
                                    ${queryMessageId}
                                    ${queryStatus}
                                    ${querySearch}
                                ORDER BY id ASC
                                LIMIT ${paginationUtils.limit} OFFSET ${paginationUtils.offset}`;
    const dataQueryListStatus = await model.sequelize.query(queryListStatus, {
      type: model.sequelize.QueryTypes.SELECT,
    });

    res.data = {
      data: dataQueryListStatus,
      pageInfo: paginationUtils,
    };
    res.answerWith(200, "List Status");
  } catch (error) {
    next(error);
  }
};
