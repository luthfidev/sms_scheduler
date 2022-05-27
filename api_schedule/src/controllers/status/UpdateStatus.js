const model = require('../../models')


exports.patch = async function (req, res, next) {
    const t = await model.sequelize.transaction();
    try {
        const { id, contact_id, messageId, status} = req.body

        if (!messageId) {
            await t.commit()
            return res.answerWith(400, 'Message ID Required')
        }
        const queryCheckStatusExist = `SELECT
                                            s.contact_id,
                                            s.messageId,
                                            s.status
                                        FROM status s
                                        WHERE s.contact_id = ${contact_id} AND s.messageId = ${messageId}`
        const dataqueryCheckStatusExist = await model.sequelize.query(queryCheckStatusExist, {
            type: model.sequelize.QueryTypes.SELECT, transaction: t
        });

        if (dataqueryCheckStatusExist.length > 0) {
            const updateStatus = await model.status.update({
                // contact_id: contact_id ? contact_id : dataqueryCheckStatusExist[0].contact_id,
                // messageId: messageId ? messageId : dataqueryCheckStatusExist[0].messageId,
                status: status ? status : dataqueryCheckStatusExist[0].status,
            }, {
                where: {
                    messageId: messageId
                },
                transaction: t
            })
    
            await t.commit();
            res.answerWith(200, 'Edit Status Success')
        } else {
            await t.commit();
            res.answerWith(400, 'Data Not Exist')
        }
    } catch (error) {
        await t.rollback()
        next(error)
    }
}
