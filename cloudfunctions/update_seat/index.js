const cloud = require('wx-server-sdk')//此人无预约
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
  let seatStatus = await db.collection("seat").where({
    seatNum:event.seat
  }).get()
  var i
  i=seatStatus.data[0].status//get this seat's status
  if(i==1){
    return wxContext.OPENID
  }else{
    return 0
  }
}
  catch (e) {
    console.error(e)
  }
}