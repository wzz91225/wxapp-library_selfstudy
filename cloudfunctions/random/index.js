const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  let order = await db.collection('appointment').field({
    _openid:true
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
  if(order.data.length>=3){
    len=3
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
  //return list1

  for(i=0;i<len;i++){
    await db.collection('seat').where({
      seatNum:list1[i]
    }).update({
      data:{
        status:3,
        openid:order.data[i]._openid
      }
    })
  }
  return db.collection('seat').get()
}