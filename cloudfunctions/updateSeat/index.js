// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let tmp = await db.collection('seat').where({
    seatNum: event.seat // 填入当前用户 openid
  }).get()
  //return tmp
  if(tmp.data[0].status==1){
    await db.collection('seat').where({
      seatNum:event.seat
    }).update({
      data:{
        status:2,
        openid: wxContext.OPENID
      }
    })
    return 1
  }
  else if(tmp.data[0].status==3){
    await db.collection('seat').where({
      seatNum:event.seat
    }).update({
      data:{
        status:2,
        openid: wxContext.OPENID
      }
    })
  }else{
    return 0
  }
 
}