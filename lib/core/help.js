const { program } = require('commander');
const helpOptions = () => {

  //添加--help里面的options项
  program.option('-d, --dest <dest>', 'a destination folder,例如 -d /src/components')
  
  program.option('-f, --framework <framework>', 'which framework project to create,例如 vue react ')
  program.on('--help', () => {
    console.log();
    console.log('Other:');
    console.log("  other options");
  })
}

module.exports = helpOptions;