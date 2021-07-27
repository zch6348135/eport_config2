const fs = require("fs");
const common = require('./common');
'use strict'
module.exports = {
    getSMZDM:()=>{
        let data = fs.readFileSync('../resource/cookie/smzdm.cookie', 'utf-8');
        console.log(data)
    }
}