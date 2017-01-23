{
    Page({
      data:{
        list:[],
      },
      onLoad:function(options){
        // 生命周期函数--监听页面加载
        var that = this;
        wx.request( {
        url: 'https://api.change.so/v1/categories.json',
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
          console.log(res);
          that.setData({
            list:res.data.categories,
          });
        },
        fail: function( res ) {
          console.log(res);
        }
    });
      },
      onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作

      },
      onReachBottom: function() {
        // 页面上拉触底事件的处理函数
      },
      onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
          title: 'title', // 分享标题
          desc: 'desc', // 分享描述
          path: 'path' // 分享路径
        }
      }
    })
}