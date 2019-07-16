const fs = require("fs");
const path = require("path");
const readline = require("readline");

//按行读取文本(外部方法需要同步调用，这边采用异步方法实现无法满足外部模块的需求)
function readTextLine(filepath){
    return new Promise((resolve,reject) => {
        const result = [];
        let reador = null;
        const exits = fs.existsSync(filepath);
        if(!exits) return resolve(result);
        try{
            const input = fs.createReadStream(filepath);
            reador = readline.createInterface({input});
        }catch(e){
            return reject(e);
        }
        reador.on("line",(line) => {
            result.push(line);
        })
        reador.on("close",() => {
            resolve(result)
        })
        reador.on("error",(e)=>{
            reject(e);
        })
    })
}

const getEnvVar = (env="development") => {
    const _getEnv = (filepath) => {
        const exits = fs.existsSync(filepath);
        if(!exits) return [];
        let stream = fs.readFileSync(filepath);
        return stream.toString().split("\r\n");
    }
    return [
        ".env",
        ".env.development",
        ".env.development.local",
        ".env.production",
        ".env.production.local",
    ].filter((item) => {
        if(item===".env") return true;
        return item.indexOf(env)>0;
    }).map((item) => {
        return _getEnv(path.resolve(__dirname,`../${item}`));
    }).reduce((prev,cur) => {
        return Object.assign(prev,cur.reduce((prev,cur) => {
            const [key,value] = cur.split("=");
            prev["REACT_APP_"+key] = '"' + value + '"';
            return prev;
        },{}))
    },{})

    //异步版本不能用
    return Promise.all([
        readTextLine(path.resolve(__dirname,"../.env")),
        readTextLine(path.resolve(__dirname,"../.env.development")),
        readTextLine(path.resolve(__dirname,"../.env.development.local")),
        readTextLine(path.resolve(__dirname,"../.env.production")),
        readTextLine(path.resolve(__dirname,"../.env.production.local")),
    ]).then((data) => {
        return data.reduce((prev,cur) => {
            return Object.assign(prev,cur.reduce((prev,cur) => {
                const [key,value] = cur.split("=");
                prev["REACT_APP_"+key] = value;
                return prev;
            },{}))
        },{})
    });
}


module.exports = getEnvVar;

