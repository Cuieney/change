var order = ["green", "red", "yellow", "blue", "green"]
Page({
  data: {
    toView: "green",
    list:[],
    playing:false,
    src:"",
    currentIndex:0,
    page:1,
    windowHeight: 0,//获取屏幕高度 
    windowWidth:0
  },
  onLoad:function(e){
    var that = this;
 //获取屏幕高度 
 wx.getSystemInfo({ 
  success: function (res) { 
    that.setData({ 
   windowHeight: res.windowHeight,
   windowWidth:res.windowWidth
  }) 
  console.log("屏幕宽度: " + res.windowWidth)
  console.log("屏幕高度: " + res.windowHeight) ;
  } 
 }) 

     wx.request( {
        url: 'https://api.change.so/v1/videos.json?page=1&per_page=20',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          that.setData({
            list:res.data.videos,
            page:that.data.page+1,
            scrollHeight:res.windowHeight

          });
        },
        fail: function( res ) {

        }
    });
  },
  onReady:function(e){
    this.videoContext = wx.createVideoContext('myVideo')
  },
  upper: function(e) {
   var that = this;

     wx.request( {
        url: 'https://api.change.so/v1/videos.json?page=1&per_page=20',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          that.setData({
            list:res.data.videos,
            page:1
          });
        },
        fail: function( res ) {

        }
    });
    console.log(page+"upper")
  },
  lower: function(e) {
     console.log(this.page+"lower");
    var that = this;
    this.setData({
      page:this.data.page+1
    });
     wx.request( {
        url: 'https://api.change.so/v1/videos.json?page='+that.data.page+'&per_page=20',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          that.setData({
             list: that.data.list.concat(res.data.videos),
          });
        },
        fail: function( res ) {
        }
    });
  },
  scroll: function(e) {
    console.log(e)
  },
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  play: function(e){
    var id = e.currentTarget.dataset.title;
    this.setData({
          playing:true,
          currentIndex:id
        });
  },
  playControler:function(){
    this.videoContext.play;
  },
 onPullDownRefresh: function () {
   console.log('--------下拉刷新-------')
　　wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log('onPullDownRefresh', new Date())
  },
  onReachBottom:function(){
    console.log('onReachBottom', new Date())
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        console.log(res, new Date())
      }
    })
  }
})
