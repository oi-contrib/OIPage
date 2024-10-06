const fs = require('fs');
const path = require('path');

const Template_404 = require('../data/404');

// 读取当前路径下的文件，方便服务器404的时候导航
module.exports = function (fullUrl) {

  let files, content = fullUrl;
  try {
    files = fs.readdirSync(fullUrl);
  } catch (e) {
    try {
      content = path.resolve(fullUrl, '../');
      files = fs.readdirSync(content);
    } catch (e) {
      files = [];
    }
  }

  let template = "<a href='../'>..</a>";
  for (let i in files) {
    let isDirectory = fs.lstatSync(path.join(content, files[i])).isDirectory();
    template += "<a class='" + (isDirectory ? "folder" : "file") + "' href='./" + files[i] + (isDirectory ? "/" : "") + "'>" + files[i] + "</a>";
  }

  return Template_404(template);
};