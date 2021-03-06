const app = getApp()
var util=require('../../util/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    data_now:'',
    state:3,
    period:[//这个是时间段列表
      {
        id:1,
        value:"07:00-10:00",
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
     SelectTime_1:[0,0,0,0,0],
     haveUpdateInfo : false
  },
  handleSelectTime(e){
    const SelectTime=e.detail.value;
    this.setData({
      SelectTime
    })
  },


backToOrderview : function(){
  setTimeout(function () {
    // 自动切换页面返回
    wx.switchTab({
      url : '../orderview/orderview',
      success : function() {
        console.log("SUCCESS: back to orderview.")
      },
      fail : function() {
        console.log("FAIL: back to orderview.")
      }
    })
  }, 500) 
},



///--------------
//上传预约信息的函数
submit:function(){
  var check = 1

  for(var k=0;k<this.data.SelectTime.length;k++){
    if(this.data.SelectTime_1[this.data.SelectTime[k]-1] == 1) {
      check=0;
      break;
    }
  }

  if (check) {
  const db = wx.cloud.database()
    for(var i=0;i<this.data.SelectTime.length;i++)
    {
      db.collection('appointment').add({
        data: {
          time: this.data.data_now,
          result: this.data.state,
          timeFlag:this.data.SelectTime[i],
          seatNum:0
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '预约申请成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)

          this.backToOrderview()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '预约申请失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })   
    }
  }
  else{
    wx.showToast({
      icon: 'none',
      title: 'ERROR:TIME_CONFLICT'
    })
    console.log("有错误,已预约时间存在冲突")
  }
},
  
  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------------
  //---------------------------------
  //获得已预约信息,返回一个可选时间段的数组
  onLoad: function (options) {
    this.setData({
      data_now : util.formatDate(new Date())
    })
    console.log(this.data.data_now)
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('appointment').where({
    _openid:this.data.openid,
    //result:3,
    time:this.data.data_now
  }).get({
    success: res => {
      var len=res.data.length
      console.log(res)
      for(let i=0;i<len;i++){
        //this.data.SelectTime_1[i]=res.data[i].timeFlag
         switch(res.data[i].timeFlag){
          case '1':this.data.SelectTime_1[0]=1;
                  break;
          case '2':this.data.SelectTime_1[1]=1;
                  break;
          case '3':this.data.SelectTime_1[2]=1;
                  break;
          case '4':this.data.SelectTime_1[3]=1;
                  break;
          case '5':this.data.SelectTime_1[4]=1;
                  break;
          default:console.log("有错误");
        }
      }
      this.setData({
          SelectTime_1 : this.data.SelectTime_1,
          haveUpdateInfo : true
      })
      console.log(this.data.openid)
      console.log('[数据库] [查询记录] 成功: ', res)
      console.log(res.data)
      console.log(this.data)
      //console.log(len)


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

  onLuanch(){
    this.getOpenid()
    },
    // 定义调用云函数获取openid
    getOpenid(){
      let page = this;
      wx.cloud.callFunction({
        name:'getOpenid',
        complete:res=>{
          console.log('openid--',res.result)
          var openid = res.result.openid
          page.setData({
            openid:openid
          })
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
