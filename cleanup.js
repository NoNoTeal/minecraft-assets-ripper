var fs = require('fs')
var path = require('path')
var { version } = require('./changeMe.json')
function removeDir(dirPath) {
    if (fs.existsSync(dirPath) !== true) {
        return;
    }

    var list = fs.readdirSync(dirPath);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dirPath, list[i]);
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
        } else if (stat.isDirectory()) {
            removeDir(filename);
        } else {
            fs.unlinkSync(filename);
        }
    }

    fs.rmdirSync(dirPath);
};
if(`./${version}` == `./`) return console.log(`Put a valid version in changeMe.json.`)
if(fs.existsSync(`./${version}`)) {
    removeDir(`./${version}`)
    console.log(`Removed ${version}`)
} else {console.log(`Could not find ${version}.`)}