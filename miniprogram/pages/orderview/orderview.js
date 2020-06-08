// pages/orderview/orderview.js
const app=getApp();
var util = require('../../util/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item : [],
    
  },
  updateDataFromCloud:function(){
    wx.cloud.callFunction({
      name: 'query_appointment', //云函数的名称
      data: {
        id:app.globalData.openid
      },
      success: res => {
        console.log(res.result.data[0])  //res的数据结构如下图res.result.data[0]
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
        

        // 切割年份
        var tmp = res.result.data
        for (var i = 0; i < tmp.length; ++i) {
          tmp[i].time = tmp[i].time.slice(5)
        }
        
        console.log('预定信息',res.result.data)
        var that=this;
        var time = util.formatTime(new Date());
        var day=parseInt(time.slice(8,10))//读取日期转为数字
        var itemTmp=[]
        console.log('现在日期',day)
        for(var i=0;i<res.result.data.length;i++){
            if(day<=parseInt(res.result.data[i].time.slice(3,5))){
              itemTmp.push(res.result.data[i]);
            }
        }
        that.setData({
          //[mtime]:res.result.data[0].time
          item:itemTmp
        })
        // wx:showToast({
        //   title:'更新成功',
        //   icon:'warn',
        //   duration:1000
        // })
      },
      fail: err => {
        console.error('[云函数] [loginInfo] 调用失败', err)

        // wx:showToast({
        //   title:'更新失败',
        //   icon:'warn',
        //   duration:1000
        // })
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
  //---------------------------
  //---------------------------
  //---------------------------
  //完成拉取预约信息，从数据库中
  onLoad: function (options) {
    this.updateDataFromCloud()
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
      // this.updateDataFromCloud()
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





        //var mtime='aa['+'0'+'].time'
        
       /* var tmp=[];
        var tmp1={
          time:"71",
         time_f:null,
         seat_n:null,
         result:null
        };
        console.log(res.result.data)
        tmp1.time="33";
        tmp.push(tmp1);*/



       
       
        
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
        
        //console.log("appointment details:"+aa)