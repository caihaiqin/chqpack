#!/usr/bin/env node
//shebang  去当前环境找node
const { program } = require('commander');

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

//从package.json获取version信息
program.version(require('./package.json').version);
//设置--help options选项
helpOptions();
//设置命令
createCommands()
//将process信息（终端中输入的命令信息）交给program解析
program.parse(process.argv);

// console.log(program.dest);  从program可以得到命令传入的参数