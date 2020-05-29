// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('appointment').where({
      _openid: wxContext.OPENID,
      //seat_num:event.seat_num
    })
    .orderBy("time_1","desc")
    .limit(5)
    .get()
  }
  catch (e) {
    console.error(e);
  }
  // db.collection('appointment').where({
  //   //_openid: wxContext.OPENID
  //     time:"2020-5-12"
  //   }).orderBy('time','asc').get({
  //     success:function(res){
  //       return res.data
  //       console.log("success")
  //     } 
  //   })

  // try{
  //   return await db.collection('appointment').orderBy('time','desc').orderBy('time','asc').get({
  //     success:function(res){
  //       console.log("这是升序排序:"+res)
  //     }
  //   });
  
}