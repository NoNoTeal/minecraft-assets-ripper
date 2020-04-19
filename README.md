# Minecraft Assets Ripper 

Minecraft Assets Ripper is a simple Node.JS 12 App with no dependencies that can grab Minecraft assets. 
This app is only available for macOS.

## Commands

You do not use the `node .` command, instead use `npm run <script>`

`npm run rip` - Reads provided file in changeMe.json and compares objects folder. Grabs each hash from objects folder and copies it to a directory in the project folder.
`npm run cleanup` - Cleans up folder name provided in changeMe.json.
`npm run list` - Previews directories being copied from objects to X.XX.json (folder)

## changeMe.json 

changeMe.json has one option, to choose your index file, e.g. `1.14.json` or `1.12.json`. To know what file to put, see your minecraft index folder. 
