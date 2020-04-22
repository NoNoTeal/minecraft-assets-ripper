"use strict";
console.log(`If you modify your index file, thats on you and this app may not work as intended.`)
const fs = require('fs')
const { version } = require('./changeMe.json')
const username = __dirname.split('/').slice(2, 3).join('/')
const versionname = version.split('.json')[0]
const indexDir = `/Users/${username}/Library/Application Support/minecraft/assets/indexes/${version}`
if(process.platform !== 'darwin') throw new Error('ERROR: Your OS version is not supported.')
if(!fs.existsSync(indexDir)) throw new Error('Could not find your index.json file. Please download the desired version first.')
else 
try{
var indexFile = JSON.parse(fs.readFileSync(indexDir)) // The file located in assets/indexes, shows all hashes.
} catch {throw new Error(`Your indexFile could not be parsed.`)}
if(fs.existsSync(`./${versionname}/assets/minecraft/`)) {
    throw new Error(`You already have the assets from ${version}, to get them again please run "npm run cleanup"`)
}
fs.mkdirSync(`./${versionname}/assets`, {recursive: true})
var objects = `/Users/${username}/Library/Application Support/minecraft/assets/objects/`
var hashes = []
var objectHashes = []
var indexValue = Object.values(indexFile.objects)
for(var v in indexValue) {
    hashes.push(indexValue[v].hash)
}
console.log(`Recieved ${version} hashes...`)
var files = fs.readdirSync(objects).filter(n => n !== '.DS_Store')
for(var folder in files) {
   objectHashes.push(fs.readdirSync(`${objects}${files[folder]}`))
}
console.log(`Recieved ${version} object's hashes...`)
objectHashes = objectHashes.join(',').split(',')
var includesAll = hashes.every(h => objectHashes.includes(h))

if(!includesAll) throw new Error(`Cannot get all hashes. Redownload the version.`)

function getKeyByValue(object, value, type) {
    if(type == 'checkHash') {
    console.log(`Hash File ${value} is ${Object.values(object).find(key => key.hash === value) ? 'in' : 'not in'} Index File ${version}`)
    return Object.values(object).find(key => key.hash === value);
    }
    if(type == 'getFileName') {
    console.log(`Directory Found for Hash File ${value.hash}: ${Object.keys(object).find(key => object[key] === value)}`)
    return Object.keys(object).find(key => object[key] === value);
    }
}
console.log(`Please wait...`)
var i = 7;
var countdown =  setInterval(() => {
    console.log(`Starting process in ${i}`)
    i--;
    if(i == 0) { clearInterval(countdown) }
}, 1000);
setTimeout(() => {

files.forEach(async (folder) => {
    var filenames = fs.readdirSync(`${objects}${folder}`)
    for(var file in filenames) {
    var checkHash = getKeyByValue(indexFile.objects, filenames[file], 'checkHash')
    if(!checkHash) continue;
    var getFileName = getKeyByValue(indexFile.objects, checkHash, 'getFileName')
    
    console.log(`Entry Detail
Hash File: ${checkHash.hash} |  Size: ${checkHash.size / 1000}KB
Directory: ${getFileName.split('/').slice(0, -1).join('/')} | Filename: ${getFileName.split('/').slice(-1).join('/')}`)
    if(!fs.existsSync(`./${versionname}/assets/${getFileName.split('/').slice(0, -1).join('/')}`)) {
    console.log(`Making directory ./${versionname}/assets/${getFileName.split('/').slice(0, -1).join('/')}`)
    fs.mkdirSync(`./${versionname}/assets/${getFileName.split('/').slice(0, -1).join('/')}`, {recursive: true})
    }
    if(getFileName.split('/').slice(-1).join('/') == 'pack.mcmeta') {
        console.log(`Writing ${objects}${folder}/${filenames[file]} as ./${versionname}/${getFileName}`)
        fs.createReadStream(`${objects}${folder}/${filenames[file]}`).pipe(fs.createWriteStream(`./${versionname}/${getFileName}`))
    } else {
    console.log(`Writing ${objects}${folder}/${filenames[file]} as ./${versionname}/assets/${getFileName}`)
    fs.createReadStream(`${objects}${folder}/${filenames[file]}`).pipe(fs.createWriteStream(`./${versionname}/assets/${getFileName}`))
    }
    }
  
})
}, 8000);