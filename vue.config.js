module.exports = {
    configureWebpack: {
        externals: { 'sqlite3':'commonjs sqlite3', }
    }
}