const fs = require("fs");
const path = require("path");
const apiPath = path.join(__dirname, "./api/");
const _assign = require("lodash/assign");
const mock = require("mockjs");
const app = require("express")();
let port = process.argv.slice(2)[0] || 9000;
const prefix = "";
app.listen(port, function() {});
let api = {};
function getApis() {
  fs.readdir(apiPath, "utf-8", function(err, files) {
    if (err) {
      return console.error(err);
    }
    api = {};
    var obj = {};
    files.forEach(function(file) {
      fs.readFile(apiPath + file, "utf-8", function(_err, content) {
        let c = JSON.parse(content);
        obj = _assign(obj, c);
      });
    });
    api = obj;
  });
}
// 监听api.json变化
fs.readdir(apiPath, "utf-8", function(err, files) {
  if (err) {
    return console.error(err);
  }
  files.forEach(function(file) {
    fs.watchFile(apiPath + file, function(curr) {
      console.log("API is updated.", curr.mtime);
      getApis();
    });
  });
});

getApis();
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  // 此处根据前端请求携带的请求头进行配置
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});
app.use(function(req, res, next) {
  var data = undefined;
  var delay = 0;
  for (var group in api) {
    if (
      api[group].find(function(reqData) {
        if (reqData.regexp) {
          if (!new RegExp(reqData.url).test(req.originalUrl)) {
            return false;
          }
        } else if (req.originalUrl.indexOf(prefix + reqData.url) !== 0) {
          return false;
        }
        var apiRes = reqData.res;
        data = reqData.mock !== false ? mock.mock(apiRes) : apiRes;
        delay = reqData.delay || 0;
        return true;
      }) !== undefined
    ) {
      break;
    }
  }
  data !== undefined
    ? setTimeout(() => res.jsonp(data), delay)
    : res.sendStatus(404);
});
