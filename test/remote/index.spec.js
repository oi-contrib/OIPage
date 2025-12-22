const { get, post } = require("../../nodejs/remote/index");

// GET请求
get("http://localhost:8080").then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});

// POST请求
// post("http://localhost:8080").then(res => {
//     console.log(res);
// }).catch(e => {
//     console.log(e);
// });