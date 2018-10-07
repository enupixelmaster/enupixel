const { enu } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

const { ENU_CONTRACT_NAME } = process.env

async function action() {
  try {
    const contract = await enu.contract(ENU_CONTRACT_NAME)
    await contract.end(
      { name: ENU_CONTRACT_NAME },
      { authorization: ENU_CONTRACT_NAME },
    )
    console.log('New canvas created')
  } catch (error) {
    console.log(`FAILED`)
    console.error(`${getErrorDetail(error)}`)
  }
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

// try end current round if possible
;(async () => {
  while (true) {
    await sleep(60 * 1000)
    await action()
  }
})()
