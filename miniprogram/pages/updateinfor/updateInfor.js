const app = getApp()
// function upd(x,database){//x is new value of status
//     const db = wx.cloud.database()
//     db.collection(database).where({
//         _openid: app.globalData.openid
//     }).update({
//       data: {
//         status : x
//       },
//       success: res => {
//         console.log("success!")
//       },
//       fail: err => {
//         icon: 'none',
//         console.error('[数据库] [更新记录] 失败：', err)
//       }
//     })
// }
function upd(x) {
  wx.cloud.callFunction({
    name: 'update',//modify user
    data: {
      //doneTime: util.formatTime(new Date())
      status:x
    },
    success: res => {
      console.log("update success")
      wx.showToast({
        title: 'success!',
        success: function () {
          
      }
    })
    },
    fail: err => {
      console.error
    }
  });
}
function upUserStatus(x) {//x:status y:seat_num
  wx.cloud.callFunction({
    name: 'updateUserStatus',//modify user
    data: {
      //doneTime: util.formatTime(new Date())
      status:x
    },
    success: res => {
      console.log("upuser1"+res)
      console.log("update success")
      wx.showToast({
        title: '更新用户表成功！'
    })
    },
    fail: err => {
      console.error
    }
  });
}
function querySeat() {//x:status y:seat_num
  wx.cloud.callFunction({
    name: 'querySeat',//modify user
    data: {
    },
    success: res => {
      console.log(res)
      wx.showToast({
        title: '获取空余座位成功！',
        success: function () {
      }
    })
    },
    fail: err => {
      console.error
    }
  });
}
function updateSeatStatus(x,y,z) {//x:seatNum y:status z:leaveTime
  wx.cloud.callFunction({
    name: 'updateSeatStatus',//modify user
    data: {
      seat:x,
      status:y,
      Time:z
    },
    success: res => {
      console.log("update infor"+res)
      wx.showToast({
        title: '修改成功！',
    })
    },
    fail: err => {
      console.error
    }
  });
}
function upseat(x) {//x:status y:seat_num
  wx.cloud.callFunction({
    name: 'updateSeat',//modify user
    data: {
      //doneTime: util.formatTime(new Date())
      seat:x
    },
    success: res => {
      console.log("传入的参数："+x)
      console.log(res)
      console.log("改seat的flag:"+res.result)
      if(res.result==0){
        wx.showToast({
          title: '坐下失败!'
      })
      }else if(res.result==1){
        console.log("balalanengliang")
        upUserStatus(1)
        wx.showToast({
          title: '坐下成功!'
      })
      }
    }

  });
}
module.exports = {
    upd: upd,
    upseat:upseat,
    upUserStatus:upUserStatus,
    querySeat:querySeat,
    updateSeatStatus:updateSeatStatus
  }