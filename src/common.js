module.exports = {
    getMidStr: (startStr,endStr,data) => {
        let offset = data.indexOf(startStr);
        let offset2 = data.indexOf(endStr);
        return data.substr(offset+startStr.length,offset2-offset-startStr.length);
    },
    getAfterStr: (startStr,data) => {
        let offset = data.indexOf(startStr);
        return data.substr(offset+startStr.length);
    }
}