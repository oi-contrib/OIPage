module.exports = {

  // 命令参数配置
  "options": {
    version: {
      short: 'v',
      info: '[0]Display the version of OIPage.',
      demo: 'oipage --version|-v'
    },
    help: {
      short: 'h',
      info: '[1]Display this help text.',
      demo: 'oipage --help|-h <term>'
    },
    root: {
      info: '[2]Set project root directory.',
      demo: 'oipage --root  ./'
    },
    dev: {
      info: '[3]Development mode running project.',
      demo: 'oipage --dev h5|mp-weixin'
    },
    build: {
      info: '[4]Package the current project.',
      demo: 'oipage --build  h5|mp-weixin'
    }
  },

  // 帮助信息
  "help": `
  Usage: oipage <command>
  
  Where <command> is one of:
    --help, -h, --version, -v, --root, --dev, --build
  
  oipage --help|-h <term>       search for help on <term>
  oipage --help|-h              involved overview
  `

};