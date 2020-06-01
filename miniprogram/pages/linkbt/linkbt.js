// pages/linkbt/linkbt.js

// const neededDeviceId = {
//   // IOS
//   'CBEB0DFF-AA6F-8D25-3639-A9FAE9C5EF32': '图书管自习室1',
//   '1645CF86-2EBA-A131-EDB9-3E1BD24DE6CD': '图书管自习室2',
//   '336FA2B6-C8E8-F7AD-48E2-54BC1A3C51E8': '赵老板倾情赞助自习室',
//   '88C731B9-BC35-1A9F-4ADE-8B649C10D466': '刘宇之父赞助自习室',
//   '9A5F4FD7-3D12-09B2-EA56-C675DBD71C46': '刘宇之父赞助自习室2',
//   '829C072F-96BB-0EEE-B3F3-30C5C313D244': '刘宇之二父赞助自习室',

//   // Android
//   // '': '图书管自习室1',
//   // '': '图书管自习室2',
//   // '': '赵老板倾情赞助自习室',
//   'E7:F6:2C:C7:7F:CD': '刘宇之父赞助自习室',
//   'EC:3C:8F:72:FC:1E': '刘宇之父赞助自习室2',
//   'C4:06:83:11:04:AF': '刘宇之二父赞助自习室',
// }


const neededServiceUUID = {
  '00001812-0000-1000-8000-00805F9B34FB' : '刘宇之父赞助自习室',
  '0000FEE0-0000-1000-8000-00805F9B34FB' : '赵老板倾情赞助自习室',
  '00001812-0000-1000-8000-00805F9B34fB' : '刘宇之父赞助父爱自习室',
  // '' : '',
}


function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}


const app = getApp()
let up=require('../updateinfor/updateInfor.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableNum:[1,2,3,4,5,6,7], //这个存桌号
    tableSelect:0,            //选择的桌子号
    devices: [],
    chs: [],
    liuyushabi:[],
    liuyuzhizhang:[],
    liuyuchishi:[],
    
    discoveryStarted: false,
    connected: false,
    haveConnected: false,
    connectedSuccess: false,
    connectedFail: false,

  },
  radioChange(e){
    console.log(e)
   var tmp=e.detail.value
    this.setData({
      tableSelect:tmp
    })
    app.data.tableSelect=parseInt(tmp)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  Link:function(){
    console.log(this.data)
    if(app.data.userStatus==3){//未就坐
      console.log("判断成功！")
      console.log(app.data)
      up.upseat(app.data.tableSelect)
      console.log("操作完成！")
      wx.showToast({
        title: '就坐成功'
    })
      wx.redirectTo({url:"../seat/seat"})
    }else if(app.data.userStatus==2){//暂离
      console.log("判断为暂离！")
      const db = wx.cloud.database()
      db.collection('seat').where({
        openid:app.globalData.openid,
        status:4
      }).get({
        success:function(res){
          console.log(res)
          up.updateSeatStatus(res.data[0].seatNum,2,"")
          up.upUserStatus(1)
          console.log(res)
        }
      })
      wx.showToast({
        title: '回座位'
      })
      wx.redirectTo({url:'../seat/seat'})
    }else{
      wx.showToast({
        title: '就坐失败'
    })
    }
      //up.querySeat()
    //up.upUserStatus(1)//1:就坐 2:暂时离开 3:结束
  },
  onLoad: function (options) {
    console.log(app.globalData.openid)
    const db = wx.cloud.database()
    db.collection('seat').where({
      status:1
    })
    .get({
      success: res => {
        console.log("list:")
        console.log(res)
        var list=[]
        var i
        for(i=0;i<res.data.length;i++){
          list.push(res.data[i].seatNum)
        }
        this.setData({
          tableNum:list
        })
        wx.showToast({
          title: '获取空余座位成功！'
      })
      }
    })
    db.collection('seat').where({
      status:4
    })
    .get({
      success: res => {
        console.log("list1:")
        console.log(res)
        var list1=[]
        var i
        for(i=0;i<res.data.length;i++){
          list1.push(res.data[i].seatNum)
        }
        this.setData({
          liuyushabi_allleave:list1
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
    db.collection('seat').where({
      status:3,
      openid:app.globalData.openid
    })
    .get({
      success: res => {
        console.log("list2:")
        console.log(res)
        var list2=[]
        var i
        for(i=0;i<res.data.length;i++){
          list2.push(res.data[i].seatNum)
        }
        this.setData({
          liuyuzhizhang_nowappoint:list2
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
    db.collection('seat').where({
      status:4,
      openid:app.globalData.openid
    })
    .get({
      success: res => {
        console.log("list3:")
        console.log(res)
        var list3=[]
        var i
        if(res.data.length>0){
          for(i=0;i<res.data.length;i++){
            list3.push(res.data[i].seatNum)
          }
        }
        this.setData({
          liuyuchishi_nowleave:list3
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
    db.collection('seat').where({
    })
    .get({
      success: res => {
        console.log("list3:")
        console.log(res)
        var list4=[]
        var i
        if(res.data.length>0){
          for(i=0;i<res.data.length;i++){
            list4.push(res.data[i])
          }
        }
        this.setData({
          liuyubeigan_allinfor:list4
        })
        wx.showToast({
          title: '获取暂离座位成功！'
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
    console.log(app.globalData.openid)
    const db = wx.cloud.database()
    db.collection('seat').where({
      status:1
    })
    .get({
      success: res => {
        console.log("list:")
        console.log(res)
        var list=[]
        var i
        for(i=0;i<res.data.length;i++){
          list.push(res.data[i].seatNum)
        }
        this.setData({
          tableNum:list
        })
        wx.showToast({
          title: '获取空余座位成功！'
      })
      }
    })
    db.collection('seat').where({
      status:4
    })
    .get({
      success: res => {
        console.log("list1:")
        console.log(res)
        var list1=[]
        var i
        for(i=0;i<res.data.length;i++){
          list1.push(res.data[i].seatNum)
        }
        this.setData({
          liuyushabi_allleave:list1
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
    db.collection('seat').where({
      status:3,
      openid:app.globalData.openid
    })
    .get({
      success: res => {
        console.log("list2:")
        console.log(res)
        var list2=[]
        var i
        for(i=0;i<res.data.length;i++){
          list2.push(res.data[i].seatNum)
        }
        this.setData({
          liuyuzhizhang_nowappoint:list2
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
    db.collection('seat').where({
      status:4,
      openid:app.globalData.openid
    })
    .get({
      success: res => {
        console.log("list3:")
        console.log(res)
        var list3=[]
        var i
        if(res.data.length>0){
          for(i=0;i<res.data.length;i++){
            list3.push(res.data[i].seatNum)
          }
        }
        this.setData({
          liuyuchishi_nowleave:list3
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
    db.collection('seat').where({
    })
    .get({
      success: res => {
        console.log("list3:")
        console.log(res)
        var list4=[]
        var i
        if(res.data.length>0){
          for(i=0;i<res.data.length;i++){
            list4.push(res.data[i])
          }
        }
        this.setData({
          liuyubeigan_allinfor:list4
        })
        wx.showToast({
          title: '获取暂离座位成功！'
      })
      }
    })
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
    this.closeBluetoothAdapter()
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

  },

  successTipClose: function () {
    this.setData({
      connectedSuccess: false
    })
  },

  failTipClose: function () {
    this.setData({
      connectedFail: false
    })
  },

  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery()
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.showModal({
            title: '错误',
            content: '未找到蓝牙设备, 请打开蓝牙后重试。',
            showCancel: false
          })
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    this.setData({
      discoveryStarted : true
    })
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      powerLevel: "high",
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      },
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      complete: () => {
        this._discoveryStarted = false
        this.setData({
          discoveryStarted : false
        })
      }
    })
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }

        if (!(device.advertisServiceUUIDs in neededServiceUUID)) {
          // console.log(device.name + '  UUID: ' + device.deviceId + '  SeID: ' + device.advertisServiceUUIDs, res)
          console.log(device.name + '  ServiceUUID: ' + device.advertisServiceUUIDs, res)
        }
        else {
          // console.log(device.name + '  SeID: ' + device.advertisServiceUUIDs, res)

          device.name = neededServiceUUID[device.advertisServiceUUIDs]
          // this.data.devices.name = neededServiceUUID[device.advertisServiceUUIDs]
          const foundDevices = this.data.devices
          const idx = inArray(foundDevices, 'deviceId', device.deviceId)
          const data = {}
          if (idx === -1) {
            data[`devices[${foundDevices.length}]`] = device
          } else {
            data[`devices[${idx}]`] = device
          }
          this.setData(data)
       }
      })
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    wx.showLoading()
    wx.createBLEConnection({
      deviceId,
      success: () => {
        this.setData({
          connected: true,
          haveConnected: true,
          connectedSuccess: true,
          name,
          deviceId,
        })
        // this.getBLEDeviceServices(deviceId)
        this.closeBLEConnection()
        this.closeBluetoothAdapter()
      },
      fail: () => {
        this.setData({
          connectedFail: true,
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          var item = res.characteristics[i]
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            this.writeBLECharacteristicValue()
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data)
    })
  },
  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    // eslint-disable-next-line
    dataView.setUint8(0, Math.random() * 255 | 0)
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._deviceId,
      characteristicId: this._characteristicId,
      value: buffer,
    })
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
    this.setData({
      discoveryStarted : false
    })
  },

})