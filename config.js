

// config
module.exports = {
    EXTENSION_BUNDLE_ID: "com.lllhy",
    EXTENSION_ID: "com.lllhy.template",

    NEED_SIGN: true,
    SIGN_CONFIG: {
        CERT_PATH: 'your cert file path', // cert file
        SIGN_PASSWORD: 'your cert password', // password
        SIGN_OUTPUT_FILE: './com.lllhy.bitmapGenerator.zip', // output path
    },

    USE_SUDO: false,  // if you need zip to a sudo folder, open this（debug need open this)

    DEBUG_CONFIG: {
        EXPORT_PATH: '/Library/Application Support/Adobe/CEP/extensions', // Your adobe extension path
        DEBUG_PORT: '8090'
    }

}