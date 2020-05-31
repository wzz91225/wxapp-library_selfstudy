
const app = getApp()
let up=require('../updateinfor/updateInfor.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    i:0,
    openid:"",
    Credit:null,
    //seat_num:null,
    status:[//color表示警告颜色。a表示严重警告未连接（红色），b表示中等警告暂时离开（黄色），c表示无警告（绿色）
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
      }
    ],

  },
  Leave:function(){//1:未就坐   2:暂时离开    3:已就座
    console.log(app.data.userStatus)
    var i=this.data.i;
    if(i!=0){
      return ;
    }
    var that=this;
    that.setData({
     i:2
    })
    //up.upd(2)
    up.upUserStatus(2)//1:就坐 2:暂时离开 3:结束
  },
  End:function(){
    console.log(app.data.userStatus)
    var i=this.data.i;
    if(i==1){
    return ;
  }
  var that=this;
  that.setData({
    i:1
  })
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
          this.setData({
            i:(res.data[0].status-1)
          })
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
          this.setData({
            i:res.data[0].status
          })
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
    this.setData({
        i:tmp
    })
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
    // const db = wx.cloud.database()
    // db.collection('user').where({

    // })
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
    Add()
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
