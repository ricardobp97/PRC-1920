var data = require('./swimmers.json')
const fs = require('fs')

function trim(arr, key) {
    var values = {};
    return arr.filter(function(item){
        var val = item[key]
        var exists = values[val]
        values[val] = true
        return !exists
    })
}

var vars = data.head.vars
newData = data.results.bindings.map(item => {
    newItem = {}
    for(let i = 0; i < vars.length; i++){
        if(typeof(item[vars[i]]) !== "undefined")
            newItem[vars[i]] = item[vars[i]].value
    }
    return newItem
})

console.log('Original size: ' + newData.length)

var trimmed = trim(newData,'name')

console.log('Trimmed size: ' + trimmed.length)

var json = JSON.stringify(trimmed,null,4);

fs.writeFile('swimmers_dataset.json', json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
})
