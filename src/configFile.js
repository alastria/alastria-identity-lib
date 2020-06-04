#!/usr/bin/node
const fs = require('fs')
const path = require('path')

const contractsPath = '../alastria-identity/contracts'
var _contractsAbi = {}

// Process the abi dir for getting an object with all the abi functions
fs.readdirSync(path.join(__dirname, `${contractsPath}/abi`)).forEach((file) => {
  const abi = {}
  const abiFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, `${contractsPath}/abi`, file), 'utf8')
  )
  abiFile.forEach((element) => {
    if (element.type === 'constructor') {
      abi.constructor = element
    } else {
      abi[element.name] = element
    }
  })
  _contractsAbi[file.match(/sol_(.*)\.abi/)[1]] = abi
})

// Read file ContractInfo.md and take rows to aobtain the addres of each contract
const contractsInfo = fs.readFileSync(
  path.join(__dirname, `${contractsPath}/`, 'ContractInfo.md'),
  'utf8'
)
const contractInfoRow = contractsInfo.split('\n')

const config = {
  alastriaIdentityManager: contractInfoRow[3].split(' | ')[1],
  alastriaCredentialRegistry: contractInfoRow[4].split(' | ')[1],
  alastriaPresentationRegistry: contractInfoRow[5].split(' | ')[1],
  alastriaPublicKeyRegistry: contractInfoRow[6].split(' | ')[1],
  basicTransaction: {
    to: '0x0000000000000000000000000000000000000000',
    data: '0x0',
    gasLimit: 0,
    gasPrice: 0,
    nonce: '0x0'
  },
  contractsAbi: _contractsAbi,
  zeroValue:
    '00000000000000000000000000000000000000000000000000000000000000000000'
}

function getConfig() {
  fs.writeFileSync(
    './src/config.ts',
    `export const config = ${JSON.stringify(config)}`
  )
}

getConfig()
