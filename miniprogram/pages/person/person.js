// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:"0"//这个表示信用分显示

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      score:app.data.Credit
    })
    //console.log(this.score)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.openid)
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
        this.changCurrentStatus(app.data.userStatus - 1)

        console.log("app data:"+app.data)
        console.log("app globaldata:"+app.globalData)
      }
    })
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