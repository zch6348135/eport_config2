const fs = require("fs");
const common = require('./common');
const path = require('path')
'use strict'
let template = fs.readFileSync('../resource/cookie/template.json', 'utf-8');
template = JSON.parse(template)
module.exports = {
    getSMZDM: () => {
        // const templateCookie = template.SMZDM_COOKIE_LIST[0].smzdm_cookie;
        // let szmdmCookie = '';
        // let arr = templateCookie.split('xxxxxx;')
        // let data = fs.readFileSync('../resource/cookie/smzdm.cookie', 'utf-8');
        // arr.forEach((value, index, array) => {
        //     value = value.trim();
        //     let offset = data.indexOf(value)
        //     if (offset < 0) {
        //         // console.log(value, " 不存在")
        //     } else {
        //         szmdmCookie += value + common.getMidStr(value, ';', data) + ";";
        //     }
        // })
        // template.SMZDM_COOKIE_LIST[0].smzdm_cookie = szmdmCookie;
        let smzdmCookie = '';
        const data = JSON.parse(fs.readFileSync('../resource/cookie/smzdm.json', 'utf-8'))
        const templateCookie = template.SMZDM_COOKIE_LIST[0].smzdm_cookie;
        let arr = templateCookie.split('=xxxxxx;')
        console.log("smzdm  template.length = ",arr.length," cookie.length = ",data.length)
        arr.forEach((value, index, array) => {
            value = value.trim();
            data.forEach((value2) => {
                if (value === value2.name) {
                    smzdmCookie += value + "="+value2.value + ";";
                }
            })
        })
        template.SMZDM_COOKIE_LIST[0].smzdm_cookie = smzdmCookie;
    },
    getBili: () => {
        let biliCookie = '';
        const data = JSON.parse(fs.readFileSync('../resource/cookie/bilibiliCookie.json', 'utf-8'))
        const templateCookie = template.BILIBILI_COOKIE_LIST[0].bilibili_cookie;
        let arr = templateCookie.split('=xxxxxx;')
        console.log("bilibili  template.length = ",arr.length," cookie.length = ",data.length)
        arr.forEach((value, index, array) => {
            value = value.trim();
            data.forEach((value2) => {
                if (value === value2.name) {
                    biliCookie += value + "="+value2.value + ";";
                }
            })
        })
        template.BILIBILI_COOKIE_LIST[0].bilibili_cookie = biliCookie;
    },
    getOutFile: () => {
        let outFile = path.resolve(__dirname, '../out/config.json')
        fs.writeFile(outFile, JSON.stringify(template, null, 4), {encoding: 'utf8'}, () => {
        });
    }
}