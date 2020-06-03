
const app = getApp()
let up=require('../updateinfor/updateInfor.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStatus : 0,   // 0:就坐, 1:暂离, 2:离开
    openid : "",
    Credit : null,
    //seat_num : null,

    /* color表示警告颜色。
      a表示严重警告未连接（红色），
      b表示中等警告暂时离开（黄色），
      c表示无警告（绿色）*/
    status:[
      {
        color:"a",
        name:"已就坐"
      },
      {
        color:"c",
        name:"暂离开"
        
      },
      {
        color:"b",
        name:"未就坐"
      },
    ],
    nowseatNum:null,
    // 决定按键disable值
    sitDisable : true,
    leaveDisable : false,
    endDisable : false,

  },


  changCurrentStatus : function(target_status){
    this.setData({
      currentStatus : target_status,
    })
    switch (target_status) {
      case 0:
        console.log("ChangCurrentStatus to sit.");
        this.setData({
          sitDisable    : true  ,
          leaveDisable  : false ,
          endDisable    : false ,
        })
        break;
      case 1:
        console.log("ChangCurrentStatus to leave.");
        this.setData({
          sitDisable    : false ,
          leaveDisable  : true  ,
          endDisable    : false ,
        })
        break;
      default:
        console.log("ChangCurrentStatus to end.");
        this.setData({
          sitDisable    : false ,
          leaveDisable  : true  ,
          endDisable    : true  ,
        })
        break;
    }
  },


  Sit:function(){
    // this.changCurrentStatus(0)
    
    // wx.redirectTo({
    wx.navigateTo({
      url : '../linkbt/linkbt',
      success : function() {
        console.log("SUCCESS: Tab seat to linkbt.")
      },
      fail : function() {
        console.log("FAIL: Tab seat to linkbt.")
      }
    })
  },

  Leave:function(){
    console.log(app.data.userStatus)
    var currentStatus = this.data.currentStatus;
    if (currentStatus != 0){
      return ;
    }
    // var that=this;
    // this.setData({
    //   currentStatus : 1
    // })
    this.changCurrentStatus(1)
    app.data.userStatus=2
    //up.upd(2)
    up.updateSeatStatus(app.data.tableSelect,4)
    up.upUserStatus(2)//1:就坐 2:暂时离开 3:结束
  },

  End:function(){
    console.log(app.data.userStatus)
    var currentStatus = this.data.currentStatus;
    if (currentStatus == 2) {
    return ;
  }
  app.data.userStatus=3
  var that=this;
  // that.setData({
  //   currentStatus : 2
  // })
  this.changCurrentStatus(2)
  up.updateSeatStatus(app.data.tableSelect,1)
  up.upUserStatus(3)//1:就坐 2:暂时离开 3:结束
  },
  //-------------------------
  //-------------------------\
  //-------------------------
  //
  //final version about register and initial(Credit and Status)
  //
  //-------------------------
  //-------------------------
  //-------------------------



  updateDataFromCloud: function(){
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

        console.log("[云函数]查询用户信息成功", res)
        // console.log("app data:"+app.data)
        // console.log("app globaldata:"+app.globalData)
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
    const db = wx.cloud.database()
    wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
    }
  }),
    
    db.collection('user').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res)
        if(res.data.length>=1){
          console.log("res information:"+res.data[0].credit)
          console.log("length information:"+res.data.length)
          //let sss=res.data[0].status
          //console.log(sss)
          // this.setData({
          //   currentStatus : (res.data[0].status-1)
          // })
          this.changCurrentStatus(res.data[0].status-1)

          app.data.Credit=res.data[0].credit
          app.data.userStatus=res.data[0].status
          wx.showToast({
            title: '登录成功',
          })
        }else{
          db.collection('user').add({
            data: {
              credit:100,
              status:3
            },
            success: res => {
              // 在返回结果中会包含新创建的记录的 _id
              this.setData({
                Credit: 100
              })
              app.data.Credit=this.data.credit
              app.data.UserStatus=this.data.status
              
              wx.showToast({
                title: '注册成功',
              })
              // this.setData({
              //   currentStatus : res.data[0].status
              // })
              this.changCurrentStatus(res.data[0].status)

              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
              wx.showToast({
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        }
        //console.log(sss)
        //console.log("用户状态："+sss)
      },
      fail: err => {
        console.log("success")
      }
    })
    console.log(app.globalData.openid)

    var tmp=app.globalData.userStatus
    // this.setData({
    //   currentStatus : tmp
    // })
    this.changCurrentStatus(tmp)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const db = wx.cloud.database()
    wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
    }
  })
    console.log("1221")
    console.log(app.globalData.openid)
    console.log("22222")
    db.collection('user').where({
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        console.log(res)
      }
    })
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
