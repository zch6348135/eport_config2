const config = require('config-lite')(__dirname);
const fs = require("fs");
const common = require('./common');
const path = require('path')
'use strict'
module.exports = {

    //获取共享cookie
    read: (cookieName) => {
        let chineseName = "";
        let out = "";
        config.sampleMap.forEach((value) => {
            if (value.key === cookieName) {
                chineseName = value.value;
            }
        })
        if (chineseName === "") {
            console.log(cookieName + "不存在");
            return out;
        }
        let data = fs.readFileSync('resource/get_share_code.txt', 'utf-8');
        let accountNum = parseInt(common.getMidStr("====================共有", "个京东账号Cookie=========", data));
        config.accountNum = accountNum;
        for (let i = 1; i <= accountNum; i++) {
            let accountData = common.getMidStr("======账号" + i + "开始======\r\n", "======账号" + i + "结束======\r\n", data);
            let accounts = accountData.split('\r\n');
            accounts.forEach((accountValue) => {
                if (accountValue.indexOf(chineseName + "】") > 0) {
                    let cookie = common.getAfterStr(chineseName + "】", accountValue);
                    if (cookie !== "undefined") {
                        if (cookieName === "Jxnc") {
                            if (cookie.indexOf("未选择种子") >= 0) {
                                out += "My" + cookieName + i + "=\'\'\r\n";
                            } else {
                                out += "My" + cookieName + i + "=\'" + cookie + "\'\r\n";
                            }
                        } else {
                            out += "My" + cookieName + i + "=\"" + cookie + "\"\r\n";
                        }
                    }
                }
            })
        }
        return out;
    },
    //获取共享策略
    getForOther: (cookieName) => {
        const templateMy = "My";
        const templateForOther = "ForOther";
        let available = 2;
        config.sampleMap.forEach((value) => {
            if (value.key === cookieName) {
                available = value.available;
            }
        })
        let out = "";
        for (let i = 1; i <= config.accountNum; i++) {
            let temp = "";
            let value = "";
            let k = 0;
            for (let j = i; j <= i + available; j++) {
                if (j > config.accountNum) {
                    if (j - config.accountNum === config.mainIndex) {
                        k = 1;
                    }
                    value += "${" + templateMy + cookieName + (j - config.accountNum + k) + "}@";
                } else {
                    value += "${" + templateMy + cookieName + (j + 1) + "}@";
                }

            }
            value += "${" + templateMy + cookieName + config.mainIndex + "}";
            let arr = value.split('@');
            if (i !== config.mainIndex) {
                let temp = arr[0];
                arr[0] = arr[arr.length - 1];
                arr[arr.length - 1] = temp;
            } else {
                arr[arr.length - 1] = "${" + templateMy + cookieName + (arr.length + 1) + "}";
            }
            value = "";
            arr.forEach((s, i) => {
                temp += s;
                if (i !== arr.length - 1) {
                    temp += "@";
                }
            })
            out += templateForOther + cookieName + i + "=\"" + temp + "\"\r\n";
        }
        for (let i = 1; i <= config.accountNum; i++) {
            let my = templateMy + cookieName + i;
            let re = new RegExp(my, "g");
        }
        return out;
    },//获取共享策略2 互点
    getForOther2: (cookieName) => {
        const templateMy = "My";
        const templateForOther = "ForOther";
        let available = 4;
        config.sampleMap.forEach((value) => {
            if (value.key === cookieName) {
                available = value.available;
            }
        })

        let out = "";
        for (let i = 1; i <= config.accountNum; i++) {
            let temp = "";
            let value = "";
            let k = 0;
            for (let j = i; j <= i + available; j++) {
                if (j > config.accountNum) {
                    value += "${" + templateMy + cookieName + (j - config.accountNum + k) + "}@";
                } else {
                    value += "${" + templateMy + cookieName + (j + 1) + "}@";
                }

            }
            value = value.substr(0, value.length - 1);

            out += templateForOther + cookieName + i + "=\"" + value + "\"\r\n";
        }
        // console.log(out);
        return out;
    }, getHealth: () => {
        let data = fs.readFileSync('resource/health.txt', 'utf-8');
        let out = "";
        for (let i = 1; i <= config.accountNum; i++) {
            let nowAccount = common.getMidStr("\r\n【京东账号", "（", data);
            if (i !== parseInt(nowAccount)) {
                continue;
            }
            data = common.getAfterStr("的东东健康社区好友互助码】", data);
            let pk = common.getBeforeStr("\r\n", data);
            out += "Myhealth" + i + "=\"" + pk + "\"\r\n";
        }
        return out;
    }, reFormatCode: () => {
        let data = fs.readFileSync('resource/code.log', 'utf-8');
        let rows = data.split("\r\n");
        let newData = ""
        let rowData = ""
        rows.forEach(value => {
            if (value.startsWith("ForOther")) {
                let v = common.getMidStr("ForOther", "=", value)
                let s = v.search(/[A-Z]/i)
                let d = v.search(/[\d]/g)
                let keyWord = v.substr(s, d);
                let index = v.substr(d);
                let cut1 = value.substr(value.indexOf("\"") + 1)
                if (index !== "1") {
                    rowData = "ForOther" + keyWord + index + "=\"${My" + keyWord + "1}@" + cut1 + "\r\n";
                } else {
                    rowData = value + "\r\n";
                }
                const firstWord = "ForOther"+keyWord+index+"=\""
                rowData = rowData.substr(rowData.indexOf(firstWord)+firstWord.length)
                let arr = rowData.split("@");
                let shortRowData = "";
                arr = arr.filter((item, index, arr) => {
                    return arr.indexOf(item, 0) === index;
                })
                if (arr !== undefined && arr.length > config.availableHelp) {
                    for (let i = 0; i < config.availableHelp; i++) {
                        shortRowData += arr[i] + "@"
                    }
                    shortRowData = shortRowData.substr(0, shortRowData.length - 1)
                    shortRowData += "\"\r\n"
                    newData += firstWord+shortRowData;
                } else {
                    newData += firstWord+rowData;
                }
            } else {
                newData += value + "\r\n";
            }
        })
        console.log(rows.length)
        let outFile = path.resolve(__dirname, '../out/newCode.log')
        fs.writeFile(outFile, newData, {encoding: 'utf8'}, (err) => {
            if (err){
                console.log(err)
            }
        });
    }

}