const fs = require("fs");
const common = require('./common');
const path = require('path')
'use strict'
let template = fs.readFileSync('../resource/cookie/template.json', 'utf-8');
template = JSON.parse(template)
module.exports = {
    getSMZDM: () => {
        const templateCookie = template.SMZDM_COOKIE_LIST[0].smzdm_cookie;
        let szmdmCookie = '';
        let arr = templateCookie.split('xxxxxx;')
        let data = fs.readFileSync('../resource/cookie/smzdm.cookie', 'utf-8');
        arr.forEach((value, index, array) => {
            value = value.trim();
            let offset = data.indexOf(value)
            if (offset < 0) {
                console.log(value, " 不存在")
            } else {
                szmdmCookie += value + common.getMidStr(value, ';', data) + ";";
            }
        })
        template.SMZDM_COOKIE_LIST[0].smzdm_cookie = szmdmCookie;
    },
    getOutFile:()=>{
        let outFile = path.resolve(__dirname, '../out/config.json')
        fs.writeFile(outFile, JSON.stringify(template,null,4), {encoding: 'utf8'}, () => {});
    }
}