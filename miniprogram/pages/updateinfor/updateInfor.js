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
function upseat(x,y) {//x:status y:seat_num
  wx.cloud.callFunction({
    name: 'update_seat',//modify user
    data: {
      //doneTime: util.formatTime(new Date())
      status:x,
      seat_num:y
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
module.exports = {
    upd: upd,
    upseat:upseat,
    upUserStatus:upUserStatus,
    querySeat:querySeat
  }