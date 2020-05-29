const app = getApp()
var util=require('../../util/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    data_now:'',
    state:0,
    period:[//这个是时间段列表
      {
        id:1,
        value:"7:00-10:00",
        value_1:"7:00"
      },
      {
        id:2,
        value:"10:00-12:00",
        value_1:"10:00"
      },
      {
        id:3,
        value:"12:00-15:00",
        value_1:"12:00"
      },
      {
        id:4,
        value:"15:00-18:00",
        value_1:"15:00"
      },
      {
        id:5,
        value:"18:00-22:00",
        value_1:"18:00"
      }
     ],
     SelectTime:[],//这个为选中的值传出去
     SelectTime_1:[]
  },
  handleSelectTime(e){
    const SelectTime=e.detail.value;
    this.setData({
      SelectTime
    })
  },
  handleSelectTime(e){
    const SelectTime=e.detail.value;
    this.setData({
      SelectTime
    })
  },
///--------------
//上传预约信息的函数
submit:function(){
  this.data.data_now = util.formatDate(new Date());
  const db = wx.cloud.database()
    for(var i=0;i<this.data.SelectTime.length;i++)
    {
      db.collection('appointment').add({
        data: {
          time_1: this.data.data_now,
          state: this.data.state,
          time_flag:this.data.SelectTime[i]
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
    }
},
  
  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------------
  //---------------------------------
  //获得已预约信息,返回一个可选时间段的数组
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('appointment').where({
    _openid:this.data.openid,
    state:0
  }).get({
    success: res => {
      var len=res.data.length
      for(let i=0;i<len;i++){
        this.data.SelectTime_1[i]=res.data[i].time_flag
      }
      this.setData({
        "SelectTime[0]" :JSON.stringify(res.data[1].time_flag, null, 2),
        ['SelectTime['+ 1 +']'] :JSON.stringify(res.data[1].time_flag, null, 2),
        ['SelectTime['+ 2 +']'] :JSON.stringify(res.data[2].time_flag, null, 2),
        ['SelectTime['+ 3 +']'] :JSON.stringify(res.data[3].time_flag, null, 2),
        ['SelectTime['+ 4 +']'] :JSON.stringify(res.data[4].time_flag, null, 2),
      })
      console.log('[数据库] [查询记录] 成功: ', res)
      console.log(res.data.length)
      console.log(this.data.SelectTime_1)
      console.log(len)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
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
