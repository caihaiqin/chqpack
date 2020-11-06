
const { program } = require('commander');

const { createProjectAction ,addComponentAction,addPageAndRouteAction,addStoreAction} = require('./actions')

const createCommands = () => { 
  //创建项目命令
  program
    .command('create <project> [others...]')
    .description("clone repository into a folder")
    .action((project, others) => {
      console.log('创建项目'+project);
      console.log(others);
      // console.log(program.dest);
      //执行创建项目操作  传入项目名project
      createProjectAction(project)
    })
  //创建组件命令
    program
    .command('addcpn <name>')
    .description("create a component 例如 chq addcpn TarBar [-d src/components]")
    .action(name => {
      console.log('创建组件' + name);
      // -d <dest>参数保存在program中 通过program.dest获取 参考help.js文件
      addComponentAction(name,program.dest || 'src/components')
     
    })
  //创建页面命令
  program
  .command('addpage <page>')
  .description("create a vue page and router 例如 chq addpage Home [-d src/pages]")
  .action(page => {
    console.log('创建页面' + page);
    // -d <dest>参数保存在program中  通过program.dest获取 参考help.js文件
    addPageAndRouteAction(page,program.dest || 'src/pages')

   
  })

  //创建store命令
  program
  .command('addstore <page>')
  .description("create a store 例如 chq addpage Home [-d src/store]")
  .action(store => {
    console.log('创建页面' + store);
    // -d 参数保存在program中  参考help.js文件
    addStoreAction(store,program.dest || 'src/store/modules')

   
  })
}


module.exports = createCommands