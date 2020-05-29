// pages/accusehistory/accusehistory.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    value: '',
    showClearBtn: false,
    isWaring: false,
},
onInput(evt) {
    const { value } = evt.detail;
    this.setData({
        value,
        showClearBtn: !!value.length,
        isWaring: false,
    });
},
onClear() {
    this.setData({
        value: '',
        showClearBtn: false,
        isWaring: false,
    });
},
onConfirm() {
    if (this.data.value.length < 16) {
        this.setData({
            isWaring: true,
        });
    }
},

  /**
   * 生命周期函数--监听页面加载
   */
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