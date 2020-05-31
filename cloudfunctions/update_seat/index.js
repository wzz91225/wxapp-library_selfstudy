const cloud = require('wx-server-sdk')//此人无预约
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
   let seatStatus = await db.collection("seat").where({
      seatNum:event.seatNum
    }).get();
    var i
    for(i=0;i<seatStatus.data.length;i++){
      seatStatus.data[i]=seatStatus.data[i].status//get this seat's status
    }
    if(seatStatus.data[0]==1){
      await db.collection("seat").where({
        seatNum:event.seatNum
      }).update({
        data:{
          status:2
        }
      })
      return 1
    }
      //seatStatus.data[0]=0
    else {
      return 0
    }
      //seatStatus.data[0]=1
    //return seatStatus.data[0]
    //seatStatus=seatStatus.data.status
    //return seatStatus
    // return await db.collection("user").where({
    //   _openid: wxContext.OPENID
    // }).update({
    //   data: {
    //     status: event.status
    //   }
    // })
  } catch (e) {
    console.error(e)
  }
}