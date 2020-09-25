const path = require("path")
const glob = require("glob")

let chunksList = []
let entry = {}

function  getModulesList() {
    let modulesList = glob.sync(path.resolve(__dirname,'../src/pages/*')) //[ '../src/pages/detail', '../src/pages/index' ]
    for(let i = 0,len = modulesList.length; i<len;i++){
        let moduleName = modulesList[i].split('/').slice(-1).join()
        chunksList.push(moduleName)
        entry[moduleName] = path.resolve(__dirname,"../src/pages/"+moduleName+'/index.js')
    }
}

getModulesList()


module.exports = {
    resolve:function (dir) {
        return path.resolve(__dirname,dir)
    },
    entry:entry,
    chunks:chunksList
}