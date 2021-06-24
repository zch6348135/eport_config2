const config = require('config-lite')(__dirname);
const fs = require("fs");
const path = require('path')
'use strict';

const readShare = require('./readShareCode')
let outFile = path.resolve(__dirname, './config.txt')
let out = "";
config.sampleMap.forEach((value => {
    out += "################################## 定义" + value.value + "活动互助（选填） ##################################\r\n";
    out += readShare.read(value.key);
    out += "\r\n";
    out += readShare.getForOther(value.key);
    out += "\r\n\r\n";
}))
// let outFile2 = path.resolve(__dirname, './other.txt')
fs.writeFile(outFile, out, {encoding: 'utf8'}, () => {});
// out = readShare.getForOther("Zoo");
// fs.writeFile(outFile2, out, {encoding: 'utf8'}, () => {});
// out = readShare.getForOther2("Zoo");
let outFile3 = path.resolve(__dirname, './health.txt')
fs.writeFile(outFile3, readShare.getZooPk(), {encoding: 'utf8'}, () => {});





