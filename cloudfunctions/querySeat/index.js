// 获得当前空闲座位的座位号
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  try {
    return await db.collection('seat').where({
      status:1
      //seat_num:event.seat_num
    })
    .get()
  }
  catch (e) {
    console.error(e);
  }
}