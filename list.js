"use strict";
console.log(`npm run list is a preview of npm run rip`)
const fs = require('fs')
const { version } = require('./changeMe.json')
const username = __dirname.split('/').slice(2, 3).join('/')
const indexDir = `/Users/${username}/Library/Application Support/minecraft/assets/indexes/${version}`
if(process.platform !== 'darwin') throw new Error('ERROR: Your OS version is not supported.')
if(!fs.existsSync(indexDir)) throw new Error('Could not find your index.json file. Please download the desired version first.')
else 
try{
var indexFile = JSON.parse(fs.readFileSync(indexDir)) // The file located in assets/indexes, shows all hashes.
} catch {throw new Error(`Your indexFile could not be parsed.`)}
var objects = `/Users/${username}/Library/Application Support/minecraft/assets/objects/`

function getKeyByValue(object, value, type) {
    if(type == 'checkHash') {
    return Object.values(object).find(key => key.hash === value);
    }
    if(type == 'getFileName') {
    return Object.keys(object).find(key => object[key] === value);
    }
}

setTimeout(() => {
var files = fs.readdirSync(objects).filter(n => n !== '.DS_Store')
files.forEach(async (folder) => {
    var filenames = fs.readdirSync(`${objects}${folder}`)
    for(var file in filenames) {
    var checkHash = getKeyByValue(indexFile.objects, filenames[file], 'checkHash')
    if(!checkHash) continue;
    var getFileName = getKeyByValue(indexFile.objects, checkHash, 'getFileName')
    console.log(`Directory ${objects}${folder}/${filenames[file]} as 
./${version}/assets/${getFileName} | Size: ${checkHash.size / 1000}KB`)
    }
  
})
}, 3000);