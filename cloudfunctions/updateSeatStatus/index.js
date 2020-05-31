const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('seat').where({
    seatNum:seat // 填入当前用户 openid
  }).update({
    data:{
      status:event.status
    }
  })
}