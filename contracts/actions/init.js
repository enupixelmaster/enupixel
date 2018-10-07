const { enu } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

const { ENU_CONTRACT_NAME } = process.env

async function action() {
  try {
    const contract = await enu.contract(ENU_CONTRACT_NAME)
    await contract.init(
      { name: ENU_CONTRACT_NAME },
      { authorization: ENU_CONTRACT_NAME },
    )
    console.log(`SUCCESS`)
  } catch (error) {
    console.log(`FAILED`)
    console.error(`${getErrorDetail(error)}`)
  }
}

action()
