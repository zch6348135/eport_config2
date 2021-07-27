module.exports = {
    getMidStr: (startStr, endStr, data) => {
        let offset = data.indexOf(startStr);
        let offset2 = data.indexOf(endStr,offset);
        return data.substr(offset + startStr.length, offset2 - offset - startStr.length);
    },
    getAfterStr: (startStr, data) => {
        let offset = data.indexOf(startStr);
        return data.substr(offset + startStr.length);
    },
    getBeforeStr: (endStr, data) => {
        let offset = data.indexOf(endStr);
        return data.substr(0, offset + endStr.length - endStr.length);
    }
}