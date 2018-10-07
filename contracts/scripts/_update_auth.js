const { enu, contractPublicKey } = require(`../config`)

const { ENU_CONTRACT_NAME } = process.env

async function updateAuth() {
  // inline action required
  const auth = {
    threshold: 1,
    accounts: [
      {
        permission: { actor: ENU_CONTRACT_NAME, permission: 'enumivo.code' },
        weight: 1,
      },
    ],
  }

  try {
    console.log('Updating contract enumivo.code permissions')
    await enu.updateauth({
      account: ENU_CONTRACT_NAME,
      permission: 'active',
      parent: 'owner',
      auth: Object.assign({}, auth, {
        keys: [{ key: contractPublicKey, weight: 1 }],
      }),
    })
    console.log(`Updated`)
  } catch (err) {
    console.error(`Cannot update contract permission`, err)
    process.exit(1)
  }
}

module.exports = {
  updateAuth,
}
