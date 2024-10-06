const fs = require('fs');
const path = require('path');

// 删除文件或文件夹
function deleteSync(target) {

  // 如果文件夹不存在，直接返回即可
  if (!fs.existsSync(target)) return;

  // 如果是文件，直接删除即可
  if (!fs.lstatSync(target).isDirectory()) {
    fs.unlinkSync(target);
  } else {

    // 读取子文件
    const subFiles = fs.readdirSync(target);

    subFiles.forEach(function (file) {

      // 调用这个方法，删除子文件或文件夹
      const curPath = path.join(target, "./" + file);
      deleteSync(curPath);

    });

    // 等子文件或文件夹删除完毕以后，删除本文件夹
    fs.rmdirSync(target);
  }

};

// 复制文件或文件夹
function copySync(source, target) {

  // 如果是文件，直接复制即可
  if (!fs.lstatSync(source).isDirectory()) {
    fs.copyFileSync(source, target);
  } else {

    // 读取子文件
    const subFiles = fs.readdirSync(source);

    // 如果文件夹不存在，创建
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    // 复制子文件或文件夹
    subFiles.forEach(function (file) {
      copySync(path.join(source, "./" + file), path.join(target, "./" + file));
    });

  }
};

// 移动文件或文件夹
function moveSync(source, target) {

  // 如果是文件，直接剪切即可
  if (!fs.lstatSync(source).isDirectory()) {
    fs.copyFileSync(source, target);
    fs.unlinkSync(source);
  } else {

    // 读取子文件
    const subFiles = fs.readdirSync(source);

    // 如果文件夹不存在，创建
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    // 移动子文件或文件夹
    subFiles.forEach(function (file) {
      moveSync(path.join(source, "./" + file), path.join(target, "./" + file));
    });

    // 移动完子文件或文件夹以后（移动完毕也意味着子文件或文件夹被删除了）
    fs.rmdirSync(source);
  }
}

// 遍历当前文件或文件夹中所有文件
function listFileSync(source, callback) {
  // 文件夹 
  if (fs.lstatSync(source).isDirectory()) {

    // 读取子文件
    const subFiles = fs.readdirSync(source);
    subFiles.forEach(function (file) {
      listFileSync(path.join(source, "./" + file), callback);
    });
  }

  // 文件
  else {
    let folder = path.join(source, "../");

    callback({
      "name": source.replace(folder, ""),
      "path": source,
      "folder": folder
    });
  }
}

// 获取文件或文件夹的全路径
function fullPathSync(pathString, contextPath) {
  if (/^\//.test(pathString) || /^[A-Za-z]:\\/.test(pathString)) {
    // 如果传递的就是全路径
    return pathString;
  }

  if (arguments.length <= 1) {
    // 默认把当前命令行作为上下文路径
    contextPath = process.cwd();
  }

  // 拼全路径
  return path.join(contextPath, pathString);
}

// 导出
exports.deleteSync = deleteSync;
exports.copySync = copySync;
exports.moveSync = moveSync;
exports.listFileSync = listFileSync;
exports.fullPathSync = fullPathSync;