function onProxyRes(proxyRes,req,res){
    var cookies = proxyRes.headers['set-cookie'];
    var cookieRegex = /domain=\.12301\.local/i;
    //修改cookie Path
    if(cookies){
        var newCookie = cookies.map((cookie) => {
            if (cookieRegex.test(cookie)) return cookie.replace(cookieRegex, 'domain=localhost');
            return cookie;
        });
        //修改cookie path
        delete proxyRes.headers['set-cookie'];
        proxyRes.headers['set-cookie'] = newCookie;
    }
}
function onProxyReq(proxyReq,req,res){

}

const proxy = {
    "/r" : {
        target : "http://my.12301.local",
        secure: false,        // 如果是https接口，需要配置这个参数
        changeOrigin: true,   // 是否跨域
        onProxyRes,
        onProxyReq,
    },
    "/dlogin.php" : {
        target : "http://my.12301.local",
        secure: false,        
        changeOrigin: true,  
        onProxyRes,
        onProxyReq,
    }
}

module.exports = proxy;