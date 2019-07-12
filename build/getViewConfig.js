const path = require("path");
const glob = require("glob");
const fs = require("fs");

module.exports = function(){
    return glob.sync(path.join(__dirname,"../src/view/*/")).map((item) => {
        const viewName = item.match(/^.*view\/(.*)\/$/)[1];
        const defaults = {
            title : "",
            entry : "index.js",
            template : "index.html",
            filename : `${viewName}.html`,
        }
        let config = {};
        try{
            config = require(path.resolve(`${item}`,"view.config.js"));
        }catch(e){}
        const exits = fs.existsSync(path.resolve(`${item}`,"index.html"));
        if(exits){//如果有自定义模板
            config.template = path.resolve(__dirname,`../src/view/${viewName}/`,"index.html")
        }else{//没有自定义模板
            config.template = path.resolve(__dirname,"../public/index.html")
        }
        config = Object.assign({},defaults,config);
        config.entry = path.resolve(__dirname,`../src/view/${viewName}/`,config.entry)
        config.minify = false;
        config.chunkName = viewName;
        return config;
    },{})
}

