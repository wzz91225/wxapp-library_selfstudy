// 获得当前空闲座位的座位号
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  try {
    let seatlist = await db.collection('seat')
    // .where({
    //   //status:1
    //   //seat_num:event.seat_num
    // })
    .field({
      seatNum:true,
      status:true
      // _id:false,
      // openid:false,
      // status:false
    })
    .orderBy("seatNum","asc")
    .get();
    //var i
    // for(i=0;i<seatlist.data.length;i++){
    //   seatlist=seatlist.data[i].seatNum
    // }
    return seatlist
  }
  catch (e) {
    console.error(e);
  }
}