
const config = require('../config')
const process = require("child_process");
const path = require("path");
const fs = require('fs')
const fsExtra = require('fs-extra');
const paths = require('../config/paths')


exports.useSudo = config.USE_SUDO && 'sudo' || "";

exports.attrCheck = (target, attrName) => {
    if (!target[attrName]){
        throw new Error(`require attr ${attrName}`);
    }
}

exports.baseDir = path.join(__dirname, '../');

exports.exec = function (shell) {
    return new Promise((resolve, reject) => {
        process.exec(shell, (error, stdout, stderr) => {
            if (error) {
                console.error(`${error}`);
                resolve();
            }
            console.log(`${stdout}`);
            resolve(stdout);
        })
    })

}



const checkManifest = exports.checkManifest = function (){
    return fs.existsSync(paths.manifestFile)
}

/**
 *
 * @param {string}content
 * @param debug
 * @return {string}
 */
const replaceExtensionID = exports.replaceExtensionID = function (content, debug=false) {
    const id = (debug?'debug.': '') + config.EXTENSION_ID ;
    return content.replace(/\{EXTENSION_ID\}/g, id)
}

/**
 *
 * @param {string}content
 * @param debug
 * @return {string}
 */
const replaceExtensionBundleID = exports.replaceExtensionBundleID = function (content, debug=false) {
    const id = (debug?'debug.': '') + config.EXTENSION_BUNDLE_ID ;
    return content.replace(/\{EXTENSION_BUNDLE_ID\}/g, id)
}

/**
 *
 * @param {string}content
 * @return {string}
 */
const replaceDebugPort = exports.replaceDebugPort = function (content) {
    return content.replace(/\{PORT\}/g, config.DEBUG_CONFIG.DEBUG_PORT)
}

const replaceMenuTitle = exports.replaceMenuTitle = function (content, debug=false) {
    if (!debug) return content;
    return content.replace(/(?<=\<Menu\>).*(?=\<\/Menu\>)/g, 'Debug Plugin')
}


exports.setManifest = function (debug=false) {
    if (!checkManifest()) return;
    let _content = "";
    _content = fs.readFileSync(paths.manifestFile).toString();
    _content = replaceExtensionID(_content, debug);
    _content = replaceExtensionBundleID(_content, debug);
    _content = replaceMenuTitle(_content, debug);

    // write
    fsExtra.ensureFileSync(paths.manifestBuildFile);
    fs.writeFileSync(paths.manifestBuildFile, _content);
}

exports.setDebug = function () {

    if (!fs.existsSync(paths.debugConfig)) return ;

    let _content = fs.readFileSync(paths.debugConfig).toString();
    // id
    _content = replaceDebugPort(_content)
    _content = replaceExtensionID(_content, true);

    // write
    fsExtra.ensureFileSync(paths.debugBuildFile);

    fs.writeFileSync(paths.debugBuildFile, _content);
}