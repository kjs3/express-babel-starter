import 'source-map-support/register'
import Debug from 'debug'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'

// templates
import index from './html/index'

const log = Debug('server')

export default function createServer() {
  const expServer = express()

  expServer.enable('trust proxy')

  expServer.use(morgan('tiny'))
  expServer.use(helmet())
  expServer.use(compression())
  expServer.use(bodyParser.json())

  expServer.use(express.static('public'))

  expServer.get('/', (req, res) => {
    debugger
    res.marko(index, {
      title: 'Express Babel Starter'
    })
  })

  // ERROR HANDLERS

  // general server errors
  expServer.use((err, req, res, next) => {
    log(`SERVER ERROR: ${err.stack}`)

    res.status(500)
    res.json({
      error: 'server error'
    })
  })

  expServer.set('port', process.env.PORT || 3000)

  return expServer.listen(expServer.get('port'), function() {
    const env = expServer.get('env')
    const port = this.address().port

    log(`Server is running in ${env} on port ${port}`)
  })
}
