const { enu } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

const { ENU_CONTRACT_NAME, TESTER_NAME } = process.env

async function action() {
  try {
    const contract = await enu.contract(ENU_CONTRACT_NAME)
    await contract.changedur(60 * 60 * 24, {
      authorization: TESTER_NAME,
    })

    console.log(`SUCCESS`)
  } catch (error) {
    console.log(`FAILED`)
    console.error(`${getErrorDetail(error)}`)
  }
}

action()
