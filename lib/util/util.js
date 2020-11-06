const ejs = require('ejs')
const { resolve } = require('path')
const path = require('path')
const fs = require('fs')
//编译模板文件函数
const compile = (templateName, data) => {
  const templatePosition = path.resolve(__dirname,`../templates/${templateName}`)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePosition, { data }, {}, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
  
}
// 创建文件夹函数
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true

    }
  }
}

//写入文件函数
const writeToFile = (path, content) => {
  // 判断路径是否存在，不存在先创建文件夹
  
    return fs.promises.writeFile(path,content)
  
  
}

module.exports = { compile,writeToFile ,createDirSync}