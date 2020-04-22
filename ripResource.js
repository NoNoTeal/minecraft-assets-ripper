"use strict";
console.log(`For this command, use the jar name of the version you want in the versions folder.`)
const fs = require('fs')
const nm = require('node-merge-fix')
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

const path = require('path')
const { version } = require('./changeMe.json')
const { exec } = require('child_process')
if(fs.existsSync('./unzip')) {
    removeDir('./unzip')
}
 fs.mkdirSync('./unzip/', {recursive: true})
if(version.endsWith(`.jar`)) throw new Error(`Remove the .jar suffix in changeMe.json`)

const username = __dirname.split('/').slice(2, 3).join('/')
var versionname = version.split('.json')[0]
if(process.platform !== 'darwin') throw new Error('ERROR: Your OS version is not supported.')
fs.mkdirSync(`./${versionname}/assets`, {recursive: true})
var versions = `/Users/${username}/Library/Application Support/minecraft/versions/`
var files = fs.readdirSync(versions).filter(n => n !== '.DS_Store')
var dirToVer = []
var nameOfVer = []
console.log(`Please wait...`)
var i = 5;
var countdown =  setInterval(() => {
    console.log(`Starting process in ${i}`)
    i--;
    if(i == 0) { clearInterval(countdown) }
}, 1000);
setTimeout(() => {

for(var folder in files) {
    var filenames = fs.readdirSync(`${versions}${files[folder]}`)
    for(var file in filenames) {
    if(filenames[file].endsWith(`.json`)) {
    console.log(`Reading ${filenames[file]}`)
    var assetHelperFile = require(`${versions}${files[folder]}/${filenames[file]}`)
    if(!assetHelperFile.assets) continue;
    if(!version.startsWith(assetHelperFile.assets)) continue;
    console.log(`JSON File ${filenames[file]} is version ${assetHelperFile.assets}`)
    
    var jarFile = fs.readdirSync(`${versions}${files[folder]}`).filter(f => f.endsWith(`.jar`) && fs.lstatSync(`${versions}${files[folder]}/${filenames[file]}`).isFile())
    console.log(`Checking for jar files in the same folder...`)
    if(jarFile.length) {
    console.log(`Version ${files[folder]} (${jarFile}, ${filenames[file]}) meets required version specified: ${version}`)
    dirToVer.push(`${versions}${files[folder]}/${jarFile}`)
    nameOfVer.push(`${jarFile}`)
    }}

    }
}
if(!dirToVer[0]) throw new Error(`Could not find a valid version. Please download a version associated to ${versionname}`)
if(nameOfVer[0] !== `${versionname}`) {console.warn(`Version ${versionname}.jar could not be found so nearby version ${nameOfVer[0]} was used instead.`)}
console.log(`Recieved ${nameOfVer[0]} as version to rip resources. Now ripping`)
console.log(`Copied file over. Executing unzip code... `)
var fixedDir = __dirname.split(/\s+/).join('\\ ')
var fixedJarDir = dirToVer[0].split(/\s+/).join(`\\ `)
exec(`unzip ${fixedJarDir} -d ${fixedDir}/unzip -p pack.png`, () => {
    fs.createReadStream(`./unzip/pack.png`).pipe(fs.createWriteStream(`./${versionname}/pack.png`))
    exec(`unzip ${fixedJarDir} -d ${fixedDir}/unzip/ -p assets/*`, () => {
        console.log(`Merging files`)
        nm.mergeTo(`./unzip/assets`, `./${versionname}/assets`, {silent: false})
        removeDir(`./unzip`)
    })
})



}, 6000);