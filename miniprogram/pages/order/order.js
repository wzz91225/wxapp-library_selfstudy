// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    period:[//这个是时间段列表
      {
        id:1,
        value:"7:00-10:00"
      },
      {
        id:2,
        value:"10:00-12:00"
      },
      {
        id:3,
        value:"12:00-15:00"
      },
      {
        id:4,
        value:"15:00-18:00"
      },
      {
        id:5,
        value:"18:00-22:00"
      }
     ],
     SelectTime:[]//这个为选中的值传出去
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

},
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------------
  //---------------------------------
  //获得已预约信息,返回一个可选时间段的数组
  onLoad: function (options) {

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
