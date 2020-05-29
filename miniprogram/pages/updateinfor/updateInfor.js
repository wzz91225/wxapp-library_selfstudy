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
module.exports = {
    upd: upd
  }