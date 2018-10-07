const { enu, contractPublicKey, testerPublicKey } = require(`../config`)
const { getErrorDetail } = require(`../utils`)
const { updateAuth } = require(`./_update_auth`)

const { ENU_CONTRACT_NAME, TESTER_NAME, CREATOR_NAME } = process.env

async function createAccount(creator, name, publicKey) {
  try {
    await enu.getAccount(name)
    console.log(`"${name}" already exists: ${publicKey}`)

    return
    // no error => account already exists
  } catch (e) {
    // error => account does not exist yet
  }
  console.log(`Creating "${name}" ...`)
  await enu.transaction((tr) => {
    tr.newaccount({
      creator: creator,
      name,
      owner: publicKey,
      active: publicKey,
    })

    tr.buyrambytes({
      payer: creator,
      receiver: name,
      bytes: 600000,
    })

    tr.delegatebw({
        from: creator,
        receiver: name,
        stake_net_quantity: `10.0000 ENU`,
        stake_cpu_quantity: `10.0000 ENU`,
        transfer: 0,
    })

    tr.transfer({
      from: creator,
      to: name,
      quantity: `100.0000 ENU`,
      memo: `init transfer`
    })
  })

  console.log(`Created`)
}

async function init() {
  try {
    await createAccount(CREATOR_NAME, ENU_CONTRACT_NAME, contractPublicKey)
    await createAccount(CREATOR_NAME, TESTER_NAME, testerPublicKey)
  } catch (error) {
    console.error(
      `Cannot create account ${ENU_CONTRACT_NAME} "${getErrorDetail(error)}"`,
    )
    process.exit(1)
  }

  await updateAuth()
}

// init()
updateAuth()
