// pages/orderview/orderview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // aa:[
    //   {
    //     nickName:"wang",
    //     reward:"failed"
    //   },
    //   {
    //     nickName: "wang",
    //     reward: "failed"
    //   },
    //   {
    //     nickName: "wang",
    //     reward: "failed"
    //   },
    //   {
    //     nickName: "wang",
    //     reward: "success"
    //   },
    //   {
    //     nickName: "wang",
    //     reward: "success"
    //   },
     
    // ],
    aa:[
      {
        time:"1",
        time_f:null,
        seat_n:null,
        result:null
      },
      {
        time:"",
        time_f:null,
        seat_n:null,
        result:null
      },
      {
        time:"",
        time_f:null,
        seat_n:null,
        result:null
      },
      {
        time:"",
        time_f:null,
        seat_n:null,
        result:null
      },
      {
        time:"",
        time_f:null,
        seat_n:null,
        result:null
      },
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------
  //---------------------------
  //---------------------------
  //完成拉取预约信息，从数据库中
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'query_appointment', //云函数的名称
      data: {
        id:"oFNyI5Cm9t_dDaBSdWBsR9G9GeXA"
      },
      success: res => {
        console.log(res.result.data[0].time)  //res的数据结构如下图res.result.data[0].time
        //var i;
        // for(i=0;i<5;i++){
        //   this.aa[i][0]=res.result.data[i].time
        //   this.aa[i][1]=res.result.data[i].time_flag
        //   this.aa[i][2]=res.result.data[i].seat_num
        //   this.aa[i][3]=res.result.data[i].result
        // }
        if(res.result==null){
          wx.showToast({
            title: '暂无预约信息',
          })
          return ;
        }
        //console.log(res.result.data)
        //var mtime='aa['+'0'+'].time'
        aa:[
          {
            time:"",
            time_f:null,
            seat_n:null,
            result:null
          },
          {
            time:"",
            time_f:null,
            seat_n:null,
            result:null
          },
          {
            time:"",
            time_f:null,
            seat_n:null,
            result:null
          },
          {
            time:"",
            time_f:null,
            seat_n:null,
            result:null
          },
          {
            time:"",
            time_f:null,
            seat_n:null,
            result:null
          },
        ]
        
        aa[1].time="2020"    //测试setdata传值
        var that=this;
        console.log(aa[0].time)
        that.setData({
          //[mtime]:res.result.data[0].time
          aa
        })
        console.log(aa[0].time)
        
        // if(res.result.data.length>=5){
        //   this.setData({
        //     'aa[0][0]':res.result.data[0].time,
        //     'aa[0][1]':res.result.data[0].time_flag,
        //     'aa[0][2]':res.result.data[0].seat_num,
        //     'aa[0][3]':res.result.data[0].result,
  
        //     'aa[1][0]':res.result.data[1].time,
        //     'aa[1][1]':res.result.data[1].time_flag,
        //     'aa[1][2]':res.result.data[1].seat_num,
        //     'aa[1][3]':res.result.data[1].result,
  
        //     'aa[2][0]':res.result.data[2].time,
        //     'aa[2][1]':res.result.data[2].time_flag,
        //     'aa[2][2]':res.result.data[2].seat_num,
        //     'aa[2][3]':res.result.data[2].result,
  
        //     'aa[3][0]':res.result.data[3].time,
        //     'aa[3][1]':res.result.data[3].time_flag,
        //     'aa[3][2]':res.result.data[3].seat_num,
        //     'aa[3][3]':res.result.data[3].result,
  
        //     'aa[4][0]':res.result.data[4].time,
        //     'aa[4][1]':res.result.data[4].time_flag,
        //     'aa[4][2]':res.result.data[4].seat_num,
        //     'aa[4][3]':res.result.data[4].result
        //   })
        // }else if(res.result.data.length>=1){
        //   this.setData({
        //     'aa[0][0]':res.result.data[0].time,
        //     'aa[0][1]':res.result.data[0].time_flag,
        //     'aa[0][2]':res.result.data[0].seat_num,
        //     'aa[0][3]':res.result.data[0].result
        //   })
        // }
        // else{
        //   return ;
        // }
        
        console.log("appointment details:"+aa)
      },
      fail: err => {
        console.error('[云函数] [loginInfo] 调用失败', err)
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