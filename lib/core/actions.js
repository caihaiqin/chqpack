
const { promisify } = require('util')//可以将回调函数转换为promise

const download = promisify(require('download-git-repo')) //git下载模块
const open = require('open')  //打开浏览器窗口模块
const path = require('path')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../util/terminal')
const {compile,writeToFile,createDirSync} = require('../util/util')

const createProjectAction =async (project) => {
  //1 clone 模板 使用download-git-repo下载 
  //download callback=>promise=>async await
  // async await将promise异步转成同步执行
  console.log("cloning template.......... ");
  await download(vueRepo, project, { clone: true }).catch(error => console.log(error.message));
  
  
  //2 npm install 安装依赖 参数'npm', ['install'], { cwd: `./${project}`}  cwd: `./${project}`进入到当前目录下project 目录执行npm命令
  //在windows中需要使用npm.cmd命令 从process.platform中得到平台信息  win32 
  console.log("installing package............");
  const command = process.platform === "win32" ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` }).catch(error => console.log(error.message));

  //3 运行 npm run serve
  console.log("run serve............");
  //此处使用await会阻塞进程
  commandSpawn(command, ['run','serve'], { cwd: `./${project}` }).catch(error => console.log(error.message));

  //4 打开浏览器
  console.log("open browser............");
  open('http://localhost:8082')
  
}

const addComponentAction =async (name,dest) => {
  // 1 编写ejs模板
  // 2 编译ejs模板  result
  const result = await compile('vue-component.ejs', { name: name, lowerName: name.toLowerCase() })
  // console.log(result);
  // 3 将result写入vue文件
  // 4 放到dest目录
  // 先判断路径是否存在，不存在先调用createDirSync创建路径再拼接

  let targetPath = ''
  if (createDirSync(dest)) {
    targetPath = path.resolve(dest, `${name}.vue`)
    console.log(targetPath);
    writeToFile(targetPath,result).catch(err=>{console.log(err);}) 
  }
  
}

const addPageAndRouteAction = async (name, dest) => {
  // 1 编写ejs模板
  // 2 编译ejs模板  result
  const data = { name: name, lowerName: name.toLowerCase() }
  const pageResult = await compile('vue-component.ejs', data)
  const routeResult = await compile('vue-router.ejs', data)
  // 3 将result写入vue/js文件
  // 4 放到dest目录
  // 先判断路径是否存在，不存在先调用createDirSync创建路径再拼接
  const targetDest = path.resolve(dest,name.toLowerCase()) //自动创建page同名目录
  let targetPagePath = ''
  let targetRoutePath = ''
  if (createDirSync(targetDest)) {
    targetPagePath = path.resolve(targetDest, `${name}.vue`)
    targetRoutePath = path.resolve(targetDest, `${name}.js`)
    console.log(targetPagePath);
    writeToFile(targetPagePath,pageResult).catch(err=>{console.log(err);}) 
    writeToFile(targetRoutePath,routeResult).catch(err=>{console.log(err);}) 
  }
}

const addStoreAction = async (name, dest) => {
  // 1 编写ejs模板
  // 2 编译ejs模板  result
  const data = {}
  const storeResult = await compile('vue-store.ejs', data)
  const typesResult = await compile('vue-types.ejs', data)
  // 3 将result写入vue/js文件
  // 4 放到dest目录
  // 先判断路径是否存在，不存在先调用createDirSync创建路径再拼接
  const targetDest = path.resolve(dest,name.toLowerCase()) //自动创建store同名目录
  let targetStorePath = ''
  let targetTypesPath = ''
  if (createDirSync(targetDest)) {
    targetStorePath = path.resolve(targetDest, `${name}.js`)
    targetTypesPath = path.resolve(targetDest, `types.js`)
    console.log(targetStorePath);
    writeToFile(targetStorePath,storeResult).catch(err=>{console.log(err);}) 
    writeToFile(targetTypesPath,typesResult).catch(err=>{console.log(err);}) 
  }
}

module.exports={createProjectAction,addComponentAction,addPageAndRouteAction,addStoreAction}