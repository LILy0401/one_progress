module.exports = {
    devServer: {
        proxy: 'http://192.168.111.78:8888'
        // proxy:'http://localhost:3002'
            //http://localhost:8088自己的后台
            //线上后台http://148.70.121.59:8088/
    },
    // publicPath:'./',
    // configureWebpack:{
    //     externals: {
    //         'vue': 'Vue',
    //         'vue-router': 'VueRouter',
    //         'vuex': 'Vuex',
    //         'axios': 'axios',
    //         'element-ui':'ELEMENT'
    //     },
    // }
}