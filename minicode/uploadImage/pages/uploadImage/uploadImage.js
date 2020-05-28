Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: "../../image/no_image.jpg"
  },

  /**
   * 按下“上传图片”按钮
   */
  uploadImage: function(e) {
    console.log(e)
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        _this.setData({
          imageSrc: res.tempFilePaths,
          hasUploadImage: true
        })
      },
      fail: function() {
      // fail
      },
      complete: function() {
      // complete
      }
    })
  }

})