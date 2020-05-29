const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    //这里的update依据是event._id
    return await db.collection("seat").where({
      _openid: wxContext.OPENID
    }).update({
      data: {
        //doneTime: event.doneTime,//订单完成时间
        seat_num:event.seat_num,
        status: event.status//订单状态
      }
    })
  } catch (e) {
    console.error(e)
  }
}