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
    seat_num:null,
    status:[//color表示警告颜色。a表示严重警告未连接（红色），b表示中等警告暂时离开（黄色），c表示无警告（绿色）
      {
        color:"a",
        name:"已就坐"
      },
      {
        color:"b",
        name:"未就坐"
      },
      {
        color:"c",
        name:"暂离开"
      }
    ]

  },
  Leave:function(){//1:未就坐   2:暂时离开    3:已就座
    var i=this.data.i;
    if(i!=0){
      return ;
    }
    var that=this;
    that.setData({
     i:2
    })
    //up.upd(2)
    up.upseat(2,this.seat_num)//1:就坐 2:暂时离开 3:结束
  },
  Link:function(){
    var i=this.data.i;
    if(i==0)
    {
      return ;
  }
  var that=this;
      that.setData({
        i:0
      })
      up.upseat(1,this.seat_num)//1:就坐 2:暂时离开 3:结束
  },
  End:function(){
    var i=this.data.i;
    if(i==1){
    return ;
  }
  var that=this;
  that.setData({
    i:1
  })
  up.upseat(3,this.seat_num)//1:就坐 2:暂时离开 3:结束
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  //},
  //Add:function(){
    const db = wx.cloud.database()
    db.collection('User').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res)
        if(res.data.length>=1){
          console.log("res information:"+res.data[0].Credit)
          console.log("length information:"+res.data.length)
          app.globalData.Credit=res.data[0].Credit
          wx.showToast({
            title: '登录成功',
          })
        }else{
          db.collection('User').add({
            data: {
              Credit:100
            },
            success: res => {
              // 在返回结果中会包含新创建的记录的 _id
              this.setData({
                Credit: 100
              })
              app.globalData.Credit=this.data.Credit
              wx.showToast({
                title: '注册成功',
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
        
      },
      fail: err => {
        console.log("success")
      }
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
