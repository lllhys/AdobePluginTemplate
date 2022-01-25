const config = require('../config');
const paths = require('../config/paths')
const {attrCheck, useSudo, exec} = require("./utils");
const fs = require('fs')
const chalk = require("react-dev-utils/chalk");

const pack = exports.pack = async () => {
    if (!config.NEED_SIGN) return ;


    attrCheck(config.SIGN_CONFIG, 'CERT_PATH')
    attrCheck(config.SIGN_CONFIG, 'SIGN_OUTPUT_FILE')
    attrCheck(config.SIGN_CONFIG, 'SIGN_PASSWORD')

    const targetFile = config.SIGN_CONFIG.SIGN_OUTPUT_FILE

    if (fs.existsSync(targetFile)){
        // remove file
        const rm = `${useSudo} rm "${targetFile}"`;
        await exec(rm);
    }

    const signSh = `${useSudo} ./scripts/ZXPSignCmd-64bit  -sign  "${paths.appBuild}" "${targetFile}" "${config.SIGN_CONFIG.CERT_PATH}"  "${config.SIGN_CONFIG.SIGN_PASSWORD}"`

    await exec(signSh);

    console.log(chalk.green('pack and sign success'))

}

pack();

