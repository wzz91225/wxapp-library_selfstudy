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
      seatNum:event.seat,
      openid: wxContext.OPENID
    }).update({
      data:{
        status:2,
        //openid: wxContext.OPENID
      }
    })
    let flag = await db.collection('seat').where({
      seatNum:event.seat,
      openid: wxContext.OPENID
    }).get()
    //return flag
    if(flag.data.length==1){
      return 1
    }else{
      return 0
    }
  }else{
    return 0
  }
 
}