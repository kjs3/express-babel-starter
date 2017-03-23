// Common-js-style require is needed here in order to set
// marko compiler settings before other modules load.
require('marko/compiler').configure({writeToDisk: false})
require('marko/node-require')
require('marko/express')
const createServer = require('./server').default

createServer()
