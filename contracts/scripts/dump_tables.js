const { enu } = require(`../config`)
const { getErrorDetail } = require(`../utils`)

const { ENU_CONTRACT_NAME } = process.env
const ROWS_LIMIT = 99999

async function script() {
  try {
    console.log("contract, ", ENU_CONTRACT_NAME);
    const [canvases, accounts] = await Promise.all([
      enu.getTableRows({
        json: true,
        code: ENU_CONTRACT_NAME,
        scope: ENU_CONTRACT_NAME,
        table: `canvases`,
        lower_bound: 0,
        upper_bound: -1,
        limit: ROWS_LIMIT,
      }),
      enu.getTableRows({
        json: true,
        code: ENU_CONTRACT_NAME,
        scope: ENU_CONTRACT_NAME,
        table: `account`,
        lower_bound: 0,
        upper_bound: -1,
        limit: ROWS_LIMIT,
      }),
    ])
    console.log('Canvases:')
    canvases.rows.forEach((row) => console.log(JSON.stringify(row, null, 2)))
    console.log('\nAccounts:')
    accounts.rows.forEach((row) => console.log(JSON.stringify(row, null, 2)))
    console.log('\nPixels:')
    const canvas = canvases.rows[0]
    if (canvas) {
      const pixels = await enu.getTableRows({
        json: true,
        code: ENU_CONTRACT_NAME,
        scope: `${canvas.id}`,
        table: `pixels`,
        lower_bound: 0,
        upper_bound: -1,
        limit: ROWS_LIMIT,
      })
      pixels.rows.forEach((row) => console.log(JSON.stringify(row, null, 2)))
    }
	  /*
    */
  } catch (error) {
    console.error(`${getErrorDetail(error)}`)
  }
}

script()
