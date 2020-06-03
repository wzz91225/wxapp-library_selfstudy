// pages/accuse/accuse.js
//获取应用实例
const app = getApp()

Page({
  openid:'',
  data: {
    accuseSelectNumIndex:0,//选择的桌号
    accuseSelectNumNew:0,//这表示选择的卓号下标
    accuseSelectNum:[],//这里放入传入的桌号
    tableNum:[],//这里放入传入的桌号
    rangekey: 0,
    accuseText:'null',
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
  bindAccuseChange: function(e) {
    console.log('accuseSelectNumIndex 发生选择改变，携带值为', e.detail.value);
    console.log('accuseSelectNumNew发生选择改变，携带值为', this.data.accuseSelectNum[e.detail.value]);
    this.setData({
      accuseSelectNumNew:this.data.accuseSelectNum[e.detail.value]
    })
    this.setData({
      accuseSelectNumIndex:e.detail.value
    })
},
textChange:function(e){
    console.log('accuseText举报文字的值为',e.detail.value)
    this.setData({
      accuseText:e.detail.value
    })

},
  onLoad: function () {
    var that = this
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
    const db = wx.cloud.database()
    db.collection('seat').field({
      seatNum:true
    })
    .get({
      
      success:function(res){//11111111111111111111111111
        console.log("liuyu happy time:")
        console.log(res.data[0].seatNum)
        console.log(res)
        var accuseTmp=[]
        for(var i=0;i<res.data.length;i++){
          accuseTmp.push(res.data[i].seatNum)
        }
        console.log(accuseTmp)
       
       
        that.setData({
          accuseSelectNum:accuseTmp
        })
      }
    })
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

        const cloudfile = _this.imageSrc
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

    uploadImageToCloud()

    const db = wx.cloud.database()
    console.log(app.globalData.fileID)
    db.collection('accuse').add({
      data: {
        accuseSeatnum: this.data.seatNum,
        reason: this.data.reason,
        // pictureUrl:app.globalData.fileID
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
// onShow:function(){
//   const db = wx.cloud.database()
//     db.collection('seat').field({
//       seatNum:true
//     })
//     .get({
//       success:function(res){
//         console.log("liuyu happy time:")
//         console.log(res)
//       }
//     })
// }


  uploadImageToCloud : function() {
    
    wx.showLoading({
      title: '上传图片中',
    })

    const filePath = this.imageSrc
    
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
        // this.setData({
        //   pictureUrl:filepath
        // })
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


