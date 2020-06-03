// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit:"0",    //信用分
    openid: ""
  },

  
  updateDataFromCloud: function(){
    var _this = this

    // console.log(app.globalData.openid)

    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid
    })
    .get({
      success: res => {
        app.data.Credit=res.data[0].credit
        app.data.userStatus=res.data[0].status
        // this.setData({
        //   currentStatus : (app.data.userStatus - 1)
        // })
        // this.changCurrentStatus(app.data.userStatus - 1)

        console.log("[云函数]查询用户信息成功", res)
        // console.log("app data:"+app.data)
        // console.log("app globaldata:"+app.globalData)
    
        _this.setData({
          credit: app.data.Credit,
          openid: app.globalData.openid
        })
      },

      fail: err => {
        console.log("[云函数]查询用户信息失败", err)
      },

      complete: function(){
        wx.stopPullDownRefresh({
          complete(res) {
            wx.hideToast()
            console.log(res, new Date())
          }
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateDataFromCloud()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.updateDataFromCloud()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateDataFromCloud()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.updateDataFromCloud()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    

  }
})