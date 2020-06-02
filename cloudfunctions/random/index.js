const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  var num=-1
  let order = await db.collection('appointment').field({
    _openid:true,
    result:'3'
  }).get()
  var i
  var list=[]
  for(i=0;i<order.data.length;i++){
    let cre = await db.collection('user').where({
      _openid:order.data[i]._openid
    }).get()
    list[i]=cre.data[0].credit
  }
  var len
  if(order.data.length>=4){
    len=4
  }else{
    len=order.data.length
  }
  var j
  var v
  var k
  for (j=0;j<order.data.length-1;j++)    //用一个嵌套循环来遍历一遍每一对相邻元素 （所以冒泡函数慢嘛，时间复杂度高）  
  {                           
      for (i=0;i<order.data.length-1-j;i++)
      {
          if(list[i]<list[i+1])
          {
              k=list[i];
              list[i]=list[i+1];
              list[i+1]=k;
              v=order.data[i]._openid
              order.data[i]._openid=order.data[i+1]._openid
              order.data[i+1]._openid=v
          }
      }
  }    
  //return list
  //return order.data
  var flag=0
  var list1=[]
  k=Math.floor(Math.random()*len + 1)
  list1[0]=k
  for(i=1;i<len;i++){
    k=Math.floor(Math.random()*len + 1)
    flag=1
    for(j=0;j<i;j++){
      if(list1[j]==k){
        i--
        flag=0
        break
      }
      if(flag!=0)
      list1[i]=k
    }
  }
//  return list1

  for(var i=0;i<order.data.length;i++){
    var aa_1=await db.collection('appointment').where({
      _openid:order.data[i]._openid,
      timeFlag:'1',
      result:3
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
      if(num>3){
        db.collection('appointment').where({
          result:3
         }).update({
          data:{
            result:2
          },
         success(res) { //成功打印消息
           console.log('3', res)
         },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
        return
      }
    }
    db.collection('appointment').where({
     _openid:order.data[i]._openid,
     timeFlag:'1',
     result:3
    }).update({
     data:{
      seatNum:list1[num],
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
  for(var i=0;i<order.data.length;i++){
    var aa_2=await db.collection('appointment').where({
      _openid:order.data[i]._openid,
      timeFlag:'2',
      result:3
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
      if(num>3){
        db.collection('appointment').where({
          result:3
         }).update({
          data:{
            result:2
          },
         success(res) { //成功打印消息
           console.log('3', res)
         },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
        return
      }
    }
    db.collection('appointment').where({
     _openid:order.data[i]._openid,
     timeFlag:'2',
     result:3
    }).update({
     data:{
      seatNum:list1[num],
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
  for(var i=0;i<order.data.length;i++){
    var aa_3=await db.collection('appointment').where({
      _openid:order.data[i]._openid,
      timeFlag:'3',
      result:3
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
      if(num>3){
        db.collection('appointment').where({
          result:3
         }).update({
          data:{
            result:2
          },
         success(res) { //成功打印消息
           console.log('3', res)
         },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
        return
      }
    }
    db.collection('appointment').where({
     _openid:order.data[i]._openid,
     timeFlag:'3',
     result:3
    }).update({
     data:{
      seatNum:list1[num],
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
  for(var i=0;i<order.data.length;i++){
    var aa_4=await db.collection('appointment').where({
      _openid:order.data[i]._openid,
      timeFlag:'4',
      result:3
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
      if(num>3){
         db.collection('appointment').where({
          result:3
         }).update({
          data:{
            result:2
          },
         success(res) { //成功打印消息
           console.log('3', res)
         },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
        return
      }
    }
    db.collection('appointment').where({
     _openid:order.data[i]._openid,
     timeFlag:'4',
     result:3
    }).update({
     data:{
      seatNum:list1[num],
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
  for(var i=0;i<order.data.length;i++){
    var aa_5=await db.collection('appointment').where({
      _openid:order.data[i]._openid,
      timeFlag:'5',
      result:3
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
      if(num>3){
        db.collection('appointment').where({
          result:3
         }).update({
          data:{
            result:2
          },
         success(res) { //成功打印消息
           console.log('3', res)
         },
         fail(res) { //存入数据库失败
           console.log('订单存入数据库操作失败');
          //云函数更新
         }
        })
        return
      }
    }
    db.collection('appointment').where({
     _openid:order.data[i]._openid,
     timeFlag:'5',
     result:3
    }).update({
     data:{
      seatNum:list1[num],
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
  
  return db.collection('seat').get()
}