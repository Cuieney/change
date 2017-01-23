
Page( {  
  data: {  
    /** 
        * 页面配置 
        */  
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    currentIndex:0,
    weeklist:[],
    monthlist:[],
    alllist:[],
    playing:false,
    windowWidth:0
  },  
  onLoad: function() {  
    var that = this;  
  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
  
      success: function( res ) {  
        that.setData( {  
          windowWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    });  
     wx.request( {
        url: 'https://api.change.so/v1/videos/ranking.json?page=1&per_page=29&since=weekly',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          console.log("week"+res.data.videos)
          that.setData({
            weeklist:res.data.videos
          });
        },
        fail: function( res ) {

        }
    });

     wx.request( {
        url: 'https://api.change.so/v1/videos/ranking.json?page=1&per_page=29&since=monthly',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          console.log("monthlist"+res.data.videos);
          that.setData({
            monthlist:res.data.videos
          });
        },
        fail: function( res ) {
          console.log(res);
        }
    });

    wx.request( {
        url: 'https://api.change.so/v1/videos/ranking.json?page=1&per_page=29&since=all',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          console.log("all"+res.data.videos);
          that.setData({
            alllist:res.data.videos
          });
        },
        fail: function( res ) {

        }
    });







  },  
 onReady:function(e){
    this.videoContext = wx.createVideoContext('myVideo')
  },

 play: function(e){
    var id = e.currentTarget.dataset.title;
    this.setData({
          playing:true,
          currentIndex:id
        });
  },

  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current, playing:false,
        currentIndex:0   });  

  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current,
        playing:false,
        currentIndex:0  
      })  
    } 

  }  
}) 