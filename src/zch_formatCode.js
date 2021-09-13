const fs = require("fs");
const path = require('path')
const fileType = [
    "Fruit",
    "Pet",
    "Bean",
    "DreamFactory",
    "JdFactory",
    "Joy",
    "Jdzz",
    "Jxnc",
    "BookShop",
    "Cash",
    "Sgmh",
    "Cfd",
    "Health",
    "Carni",
    "City",
    "MoneyTree",
    "TokenJxnc"
]
fileType.forEach(type => {
    let filePath = '../log/.ShareCode/' + type + '.log';
    try {
        let data = fs.readFileSync(filePath, 'utf-8');
        let rows = data.split("\n");
        let newData = ""
        let rowData = ""
        let availableHelp = 6
        const forOther = "ForOther"
        const equals = "="
        rows.forEach(value => {
            if (value.startsWith(forOther)) {
                let offset = value.indexOf(forOther);
                let offset2 = value.indexOf(equals, offset);
                let v = value.substr(offset + forOther.length, offset2 - offset - forOther.length);
                let s = v.search(/[A-Z]/i)
                let d = v.search(/[\d]/g)
                let keyWord = v.substr(s, d);
                let index = v.substr(d);
                let cut1 = value.substr(value.indexOf("\"") + 1)
                if (index !== "1" && value.indexOf("{My" + keyWord + "1}") < 0) {
                    rowData = "ForOther" + keyWord + index + "=\"${My" + keyWord + "1}@" + cut1 + "\r\n";
                } else {
                    rowData = value + "\n";
                }
                const firstWord = "ForOther" + keyWord + index + "=\""
                rowData = rowData.substr(rowData.indexOf(firstWord) + firstWord.length)
                let arr = rowData.split("@");
                arr = arr.filter((item, index, arr) => {
                    return arr.indexOf(item, 0) === index;
                })
                let shortRowData = "";
                if (arr !== undefined && arr.length > availableHelp) {
                    for (let i = 0; i < availableHelp; i++) {
                        shortRowData += arr[i] + "@"
                    }
                    shortRowData = shortRowData.substr(0, shortRowData.length - 1)
                    shortRowData += "\"\n"
                    newData += firstWord + shortRowData;
                } else {
                    newData += firstWord + rowData;
                }
            } else {
                newData += value + "\n";
            }
        })
        let outFile = path.resolve(__dirname, filePath)
        fs.writeFile(outFile, newData, {encoding: 'utf8'}, (err) => {
            if (err) {
                console.log(err)
            }
        });
    } catch (err) {
        console.log(type, '不存在')
    }
})
