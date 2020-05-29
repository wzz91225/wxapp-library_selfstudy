
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i:0,
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
Leave:function(){
  var i=this.data.i;
  if(i!=0)
  {
    return ;
}
var that=this;
    that.setData({
      i:2
    })
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
