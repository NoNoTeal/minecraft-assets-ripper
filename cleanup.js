var fs = require('fs')
var path = require('path')
var { version } = require('./changeMe.json')
var versionname = version.split('.json')[0]
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
if(`./${versionname}` == `./`) return console.log(`Put a valid version in changeMe.json.`)
if(fs.existsSync(`./${versionname}`)) {
    removeDir(`./${versionname}`)
    console.log(`Removed ${versionname}`)
} else {console.log(`Could not find ${versionname}.`)}