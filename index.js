'use strict';
module.exports = function (str) {

    var attParts = str.split(/\s+/)
    var attSpaces = str.match(/\s+/gm)
    var attrs = {}
    var openAttr

    attParts.forEach(function (item, index) {
        if (!item) return
        if (openAttr) {
            var space = attSpaces[index - 1]
            item = openAttr.open + space + item
            if (openAttr.close.test(item)) {
                openAttr = null
                var attMatches = item.match(/^([^\s\=]*?)\=['"]([\s\S]*?)['"]$/m)
                return attrs[attMatches[1]] = attMatches[2]
            } else {
                return openAttr.open = item
            }
        } 

        var quotes = item.match(/^([^\s\=]*?)\=('|")([\s\S]*)$/m)
        if (quotes) {
            var reg
            switch (quotes[2]) {
                case '"':
                    reg = /"$/
                    break
                case "'":
                    reg = /'$/
                    break
            }
            if (reg.test(item) && !/^[^\s\=]*?\=['"]$/m.test(item)) 
                return attrs[quotes[1]] = quotes[3].replace(reg, '')
            else {
                return openAttr = {
                    open: item,
                    close: reg
                }
            }
        } 
        var withoutQuotes = item.match(/^([^\s\=]*?)\=([\s\S]*?)$/m)
        if (withoutQuotes){
            return attrs[withoutQuotes[1]] = withoutQuotes[2] || ''
        }
        // key only attribute
        return attrs[item.split('=')[0]] = ''
    })
    if (openAttr) {
        console.warn('Unclose attribute: ' + openAttr.open)
    }
    return attrs
}