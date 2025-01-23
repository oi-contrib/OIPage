const nodejs = require('../nodejs/index');

nodejs.listFileSync("./nodejs", fileInfo => {
    console.log(fileInfo);
});