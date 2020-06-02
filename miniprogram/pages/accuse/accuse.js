// pages/accuse/accuse.js
//获取应用实例
const app = getApp()

Page({
  openid:'',
  data: {
    accuseSelectNum:[1,2,3,4,5,6,7,8,9],
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
      },
      

    ],
    seatNum:null,
    reason:'',
    pictureUrl:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUploadImage: false,
    imageSrc: ""
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
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        _this.setData({
          imageSrc: res.tempFilePaths,
          hasUploadImage: true
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  submit:function(){
    //if (app.globalData.openid) {
    //  this.setData({
    //    openid: app.globalData.openid
    //  })
    //}

    uploadImagetoCloud()

    const db = wx.cloud.database()
    console.log(app.globalData.fileID)
    db.collection('accuse').add({
      data: {
        accuseSeatnum: this.data.seatNum,
        reason: this.data.reason,
        pictureUrl:app.globalData.fileID
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },



  uploadImagetoCloud : function() {
    
    wx.showLoading({
      title: '上传中',
    })

    const filePath = res.tempFilePaths[0]
    
    // 上传图片
    var num=Math.random()*100
    const cloudPath = num + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)

        app.globalData.fileID = res.fileID
        app.globalData.cloudPath = cloudPath
        app.globalData.imagePath = filePath
        console.log(filepath)
        this.setData({
          pictureUrl:filepath
        })
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
})


