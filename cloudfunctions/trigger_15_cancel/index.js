// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var aa=await db.collection('seat').where({
    status:3,
   }).get({
    success:function(res) { //成功打印消息
      console.log('3', res)
    },
     fail(res) { //存入数据库失败
       console.log('订单存入数据库操作失败');
      //云函数更新
     }
    })
    for(var i=0;i<aa.data.length;i++){
      bb=await db.collection('user').where({
        _openid:aa.data[i].openid
      }).get({
        success:function(res) { //成功打印消息
          console.log('3', res)
        },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
        await db.collection('user').where({
          _openid:bb.data[0]._openid
         }).update({
           data:{
            credit:bb.data[0].credit-15,
          },
          success(res) { //成功打印消息
            console.log('3', res)
          },
           fail(res) { //存入数据库失败
             console.log('订单存入数据库操作失败');
            //云函数更新
           }
          })
      await db.collection('seat').where({
        status:aa.data[i].status
       }).update({
         data:{
          status:1,
        },
        success(res) { //成功打印消息
          console.log('3', res)
        },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
    }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}