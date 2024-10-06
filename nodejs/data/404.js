const img_folder = require("./images/folder");
const img_file = require("./images/file");

module.exports = function (template) {
    return `<!DOCTYPE html>
    <html lang="zh-cn">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404 Not Found</title>
    <style>
      body{
          margin: 0px;
          background-color:#fcfcfc;
          display: flex;
          flex-wrap:wrap;
          padding:100px;
      }
      body>a{
          text-decoration: none;
          padding:10px;
          color:#000000;
          text-align:center;
          width:100px;
          background-repeat: no-repeat;
          background-position: center 0px;
          padding-top: 65px;
          margin-top: 50px;
          font-size:12px;
      }
      body>a:hover{
          outline:1px solid #55b9e6;
      }
      body>a.folder{
          background-image:url('${img_folder}');
      }
      body>a.file{
          background-image:url('${img_file}');
      }
    </style>
    </head>
    
    <body>
    
    ${template}
    
    </body>
    
    </html>`;
};