const Enu = require('enujs')
const { ecc } = Enu.modules
const binaryen = require(`binaryen`)
const dotenv = require(`dotenv`)

dotenv.config({
  // path: `.env`,
  path: `.env.prod`,
})
// used in dev only
const creatorPrivateKey = process.env.CREATOR_PRIVATE_KEY

const contractPrivate = process.env.CONTRACT_PRIVATE_KEY
const contractPublicKey = ecc.privateToPublic(contractPrivate)

const testerPrivate = process.env.TESTER_PRIVATE_KEY
const testerPublicKey = ecc.privateToPublic(testerPrivate)

const keyProvider = [creatorPrivateKey, contractPrivate, testerPrivate]
const logger = { error: null }

const httpProtocol = process.env.EOS_NETWORK_PROTOCOL
const host = process.env.EOS_NETWORK_HOST
const port = process.env.EOS_NETWORK_PORT
const chainId = process.env.EOS_NETWORK_CHAINID

const enu = Enu({
  keyProvider,
  binaryen,
  logger,
  httpEndpoint: `${httpProtocol}://${host}:${port}`,
  chainId,
  // uncomment next line for debugging
  // verbose: true,
  broadcast: true,
  sign: true
})

module.exports = {
  enu,
  contractPublicKey,
  testerPublicKey,
}
