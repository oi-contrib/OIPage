module.exports = {

  // 命令参数配置
  "options": {
    version: {
      short: 'v',
      info: '[0]Display the version of OIPage.',
      demo: 'oipage-cli --version|-v'
    },
    help: {
      short: 'h',
      info: '[1]Display this help text.',
      demo: 'oipage-cli --help|-h <term>'
    },
    server: {
      short: 's',
      info: '[2]Render source server.',
      demo: 'oipage-cli --server|-s [port|20000] [basePath|./]'
    },
    config: {
      short: 'c',
      info: '[3]Specify a configuration file.',
      demo: 'oipage-cli --config|-c ./OIPage.config.js'
    },
    delete: {
      info: '[4]Delete file or folder.',
      demo: 'oipage-cli --delete targetPath'
    },
    copy: {
      info: '[5]Copy file or folder.',
      demo: 'oipage-cli --copy sourcePath targetPath'
    },
    pick: {
      info: '[6]Copy all files in the folder to the specified location.',
      demo: 'oipage-cli --pick sourcePath targetPath'
    },
    move: {
      info: '[7]Move file or folder.',
      demo: 'oipage-cli --move sourcePath targetPath'
    },
    network: {
      info: '[8]Display network information.',
      demo: 'oipage-cli --network'
    },
    get: {
      info: '[9]HTTP GET.',
      demo: 'oipage-cli --get url'
    },
    post: {
      info: '[10]HTTP POST.',
      demo: 'oipage-cli --post url'
    },
    cat: {
      info: '[11]Show file.',
      demo: 'oipage-cli --cat path'
    },
    run: {
      info: '[12]Run multiple commands.',
      demo: 'oipage-cli --run \"commands1\" \"commands2\" \"commands3\"'
    }
  },

  // 帮助信息
  "help": `
  Usage: oipage-cli <command>
  
  Where <command> is one of:
    --help, -h, --server, -s, --version, -v, --config, -c, --delete, --copy, --pick, --move, --network, --get, --post, --cat
  
  oipage-cli --help|-h <term>       search for help on <term>
  oipage-cli --help|-h              involved overview
    `

};