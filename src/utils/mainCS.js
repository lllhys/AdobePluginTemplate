// This file is used to create CSInterface and polyfill JSON into ExtensionScript.
// In general, do not delete or modify it


const cs = new window.CSInterface();

// json
const path = cs.getSystemPath(window.SystemPath.EXTENSION) + "/jsx/";
cs.evalScript(`$.evalFile("${path}json3.jsx")`);

export const evalJSXScript = (script) =>
    new Promise((resolve) => {
        cs.evalScript(script, (res) => {
            console.log(res);
            resolve(res);
        });
    });


export default cs;