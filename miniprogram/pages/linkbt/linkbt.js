// pages/linkbt/linkbt.js
const app = getApp()
let up=require('../updateinfor/updateInfor.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableNum:[1,2,3,4,5,6,7],//这个存桌号
    tableSelect:0//选择的桌子号

  },
  radioChange(e){
    console.log(e)
   var tmp=e.detail.value
    this.setData({
      tableSelect:tmp
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  Link:function(){
    var i=this.data.i;
    if(i==0){
      return ;
    }
    var that=this;
      that.setData({
        i:0
    })
    if(app.globalData.userStatus==3){//未就坐
      console.log("判断成功！")
      //up.upseat(this.tableSelect)
      wx.showToast({
        title: '就坐成功'
    })
    }else if(app.globalData.userStatus==2){//暂离
      console.log("判断失败！")
      wx.showToast({
        title: '就坐失败'
    })
    }else{
      wx.showToast({
        title: '就坐失败'
    })
    }
      //up.querySeat()
    up.upUserStatus(1)//1:就坐 2:暂时离开 3:结束
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'querySeat',//modify user
      data: {
      },
      success: res => {
        console.log(res)
        var list=[]
        var i
        for(i=0;i<res.result.data.length;i++){
          list.push(res.result.data[i].seatNum)
        }
        this.setData({
          tableNum:list
        })
        wx.showToast({
          title: '获取空余座位成功！'
      })
      },
      fail: err => {
        console.error
      }
    });
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