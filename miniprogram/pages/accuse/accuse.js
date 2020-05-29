// pages/accuse/accuse.js
//获取应用实例
const app = getApp()

Page({
  data: {
    rangekey: 0,
    accusecause:[
      {
        id:1,
        cause:"王"
      },
      {
        id:2,
        cause:"者"
      },
      {
        id:3,
        cause:"荣"
      },
      {
        id:4,
        cause:"耀"
      }
    ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUploadImage: false,
    imageSrc: "../../image/no_image.jpg"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  uploadImage: function(e) {
    console.log(e)
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        _this.setData({
          imageSrc: res.tempFilePaths,
          hasUploadImage: true
        })
      },
      fail: function() {
      // fail
      },
      complete: function() {
      // complete
      }
    })
  }
})
