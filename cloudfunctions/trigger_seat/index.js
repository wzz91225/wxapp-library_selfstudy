// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  var num=0
  var aa=await db.collection('user').orderBy("credit","desc").get({
    success:function(res) { //成功打印消息
    
      console.log('3', res)
    },
     fail(res) { //存入数据库失败
       console.log('订单存入数据库操作失败');
      //云函数更新
     }
    })
  
    for(var i=0;i<aa.data.length;i++){
      var aa_1=await db.collection('appointment').where({
        _openid:aa.data[i]._openid,
        timeFlag:'1',
        result:0
      }).get({
          success:function(res) { //成功打印消息
            console.log('3', res)
          },
           fail(res) { //存入数据库失败
             console.log('订单存入数据库操作失败');
            //云函数更新
           }
          })
      if(aa_1.data.length!=0){
        num=num+1
      }
      db.collection('appointment').where({
       _openid:aa.data[i]._openid,
       timeFlag:'1',
       result:0
      }).update({
       data:{
        seatNum:num,
        result:1
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
    for(var i=0;i<aa.data.length;i++){
      var aa_2=await db.collection('appointment').where({
        _openid:aa.data[i]._openid,
        timeFlag:'2',
        result:0
      }).get({
          success:function(res) { //成功打印消息
            console.log('3', res)
          },
           fail(res) { //存入数据库失败
             console.log('订单存入数据库操作失败');
            //云函数更新
           }
          })
      if(aa_2.data.length!=0){
        num=num+1
      }
      db.collection('appointment').where({
       _openid:aa.data[i]._openid,
       timeFlag:'2',
       result:0
      }).update({
       data:{
        seatNum:num,
        result:1
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
    for(var i=0;i<aa.data.length;i++){
      var aa_3=await db.collection('appointment').where({
        _openid:aa.data[i]._openid,
        timeFlag:'3',
        result:0
      }).get({
          success:function(res) { //成功打印消息
            console.log('3', res)
          },
           fail(res) { //存入数据库失败
             console.log('订单存入数据库操作失败');
            //云函数更新
           }
          })
      if(aa_3.data.length!=0){
        num=num+1
      }
      db.collection('appointment').where({
       _openid:aa.data[i]._openid,
       timeFlag:'3',
       result:0
      }).update({
       data:{
        seatNum:num,
        result:1
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
    for(var i=0;i<aa.data.length;i++){
      var aa_4=await db.collection('appointment').where({
        _openid:aa.data[i]._openid,
        timeFlag:'4',
        result:0
      }).get({
          success:function(res) { //成功打印消息
            console.log('3', res)
          },
           fail(res) { //存入数据库失败
             console.log('订单存入数据库操作失败');
            //云函数更新
           }
          })
      if(aa_4.data.length!=0){
        num=num+1
      }
      db.collection('appointment').where({
       _openid:aa.data[i]._openid,
       timeFlag:'1',
       result:0
      }).update({
       data:{
        seatNum:num,
        result:1
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
    for(var i=0;i<aa.data.length;i++){
      var aa_5=await db.collection('appointment').where({
        _openid:aa.data[i]._openid,
        timeFlag:'5',
        result:0
      }).get({
          success:function(res) { //成功打印消息
            console.log('3', res)
          },
           fail(res) { //存入数据库失败
             console.log('订单存入数据库操作失败');
            //云函数更新
           }
          })
      if(aa_5.data.length!=0){
        num=num+1
      }
      db.collection('appointment').where({
       _openid:aa.data[i]._openid,
       timeFlag:'5',
       result:0
      }).update({
       data:{
        seatNum:num,
        result:1
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
    return num
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}