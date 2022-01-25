
# Feature

- develop use React: Support develop use React/Less and more then. 
- debug: Support Adobe client Debug and hot update
- sign: Support pack and sign build files.


# debug 

You need to set `DEBUG_CONFIG` in `config.js` file first. Then run `npm run start:debug`, start Adobe app,
so you can see plugin in your app.

You can debug plugin running inside the client, open `http://localhost:{PORT}` in your browser, the PORT is set by your 
self in `config.js`.

> - If you want to config debug params, edit .debug in project.
> - ExtensionScript-jsx files cannot be reloaded automatically, you need to restart plugin by yourself.

# Pack & Sign

You can pack & sign the bundle with `npm run pack` after you run `npm run build`,
or you can run `npm run build:pack` directly.

## Sign Config

Before you run `npm run pack`, need to set sign config.

- `signature certificate`: put your signature certificate to project root path. And set `CERT_PATH`
- `signature password`: set `SIGN_PASSWORD` in config.
- `output path`: set `SIGN_OUTPUT_FILE`

if the file target auth is root, you can set `USE_SUDO` to true.


# Some problems

- The jsx files cannot be hot update automatically, the program will copy the newest file to target, but you need to restart 
the plugin in app by your self.
- All of this has been checked in MacOS, if your use in Windows and find some problems, pls feedback to me.