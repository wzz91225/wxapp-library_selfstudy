// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  var aa=await db.collection('appointment').where({
    result:1,
    timeFlag:event.timeFlag,
   }).get({
    success:function(res) { //成功打印消息
      console.log('3', res)
    },
     fail(res) { //存入数据库失败
       console.log('订单存入数据库操作失败');
      //云函数更新
     }
    })
   var bb=await db.collection('seat').get({
      success:function(res) { //成功打印消息
      
        console.log('3', res)
      },
       fail(res) { //存入数据库失败
         console.log('订单存入数据库操作失败');
        //云函数更新
       }
      })
  console.log('触发器触发')
   for(var i=0;i<aa.data.length;i++)
   {
     for(var j=0;j<bb.data.length;j++)
     { 
        if((aa.data[i].seatNum==bb.data[j].seatNum)&&(bb.data[j].status==2)){
          if(aa.data[i]._openid==bb.data[j].openid){
            await db.collection('seat').where({
              seatNum:aa.data[i].seatNum
             }).update({
               data:{
                status:2,
              },
              success(res) { //成功打印消息
                console.log('3', res)
              },
               fail(res) { //存入数据库失败
                 console.log('订单存入数据库操作失败');
                //云函数更新
               }
              })
              break
          }else{
            await db.collection('seat').where({
              seatNum:aa.data[i].seatNum
             }).update({
               data:{
                openid:aa.data[i]._openid,
                status:3,
              },
              success(res) { //成功打印消息
                console.log('3', res)
              },
               fail(res) { //存入数据库失败
                 console.log('订单存入数据库操作失败');
                //云函数更新
               }
              })
              await db.collection('user').where({
                _openid:bb.data[i].openid
               }).update({
                 data:{
                  status:3,
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
           break
        }else{
          await db.collection('seat').where({
            seatNum:aa.data[i].seatNum,
           }).update({
            data:{
             openid:aa.data[i]._openid,
             status:3,
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
     }
   }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    aa,
    bb,
  }
}