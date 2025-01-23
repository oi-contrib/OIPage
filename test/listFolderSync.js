const nodejs = require('../nodejs/index');

nodejs.listFolderSync("./", folderInfo => {
    console.log(folderInfo);

    // 控制不再深入
    if (folderInfo.name == "nodejs") return true;
});