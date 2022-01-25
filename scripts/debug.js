process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra")
const {useSudo, exec, baseDir, replaceDebugPort, replaceExtensionID, setDebug, setManifest} = require("./utils");
const paths = require('../config/paths')
const config = require('../config')
const chalk = require("react-dev-utils/chalk");
const getClientEnvironment = require("../config/env");

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));


const debug = exports.debug = async () => {

    const exportPath = config.DEBUG_CONFIG.EXPORT_PATH


    if (fs.existsSync(path.join(exportPath, 'debug'))){
        // remove file
        const rm = `${useSudo} rm -rf "${exportPath}/debug"`;
        await exec(rm);
    }

    copyPublicFolder()

    // insert debug
    let htmlContent = fs.readFileSync(paths.appHtml).toString();
    // /(?<=\<)[a-z0-9]+(?=\>)/g
    htmlContent = htmlContent.replace(/(?<=\<title\>).*(?=\<\/title\>)/, 'Plugin Debug');
    htmlContent = htmlContent.replace("</body>", onlineDebug + "</body>");
    // console.log(htmlContent)
    fs.writeFileSync(paths.buildHtml, htmlContent);


    // copy to target
    const copyFiles = `${useSudo} cp -r "${paths.appBuild}" "${exportPath}/debug"`;

    // console.log(copyFiles)

    let timer = -1;



    // 起服务监听jsx变更
    fs.watch(path.join(paths.appPublic, 'jsx'), {recursive: true}, (type, filename) => {
        if (timer !== -1) {
            return;
        }

        timer = setTimeout(() => {
            const copy = `${useSudo} cp -r "${paths.appBuild}/jsx" "${exportPath}/debug"`;

            exec(copy);

            console.log(chalk.green(filename + ' changed. pls reopen plugin by your self.'))
            timer = -1;
        }, 500)


    })
    // exec copy
    await exec(copyFiles);



    console.log(chalk.yellow('Debug copy success, go to ps open plugin.'))

}



function copyPublicFolder() {
    fsExtra.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml,
    });

    // 处理extension id
    setManifest(true);
    setDebug()

}

const onlineDebug = `
<script>
  location.href = 'http://localhost:3000'
</script>
`

const defaultDebugConfig = `<?xml version='1.0' encoding='UTF-8'?>
<ExtensionList>
  <Extension Id="{EXTENSION_ID}">
    <HostList>
      <Host Name="PHXS" Port="{PORT}" />
      <Host Name="PHSP" Port="{PORT}"/>
    </HostList>
  </Extension>
</ExtensionList>
`

debug();