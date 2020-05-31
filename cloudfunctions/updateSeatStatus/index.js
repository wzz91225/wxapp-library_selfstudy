const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('seat').where({
    seatNum:event.seat // 填入当前用户 openid
  }).update({
    data:{
      status:event.status,
      openid:wxContext.OPENID
    }
  })
}