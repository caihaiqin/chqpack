//执行终端命令模块
//导入子进程模块 在子进程中执行命令
const { exec, spawn } = require('child_process')

const commandSpawn = (...args) => {
  // spawn执行后返回一个子进程
  console.log(args);
 
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
  //输出子进程执行过程信息
    childProcess.stdout.on('data', (data) => {
    console.log(` ${data}`);
    });
  //输出子进程错误信息
    childProcess.stderr.on('data', (data) => {
      console.error(` ${data}`);
      
    });
    //进程执行结束
    childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    resolve()
    });
  })

}

module.exports={commandSpawn}