#!/usr/bin/node
const fs = require('fs')
const path = require('path')

const contractsABIPath = '../upgradeable-contracts/abi'
var _contractsAbi = {}

// Process the abi dir for getting an object with all the abi functions
fs.readdirSync(path.join(__dirname, `${contractsABIPath}`)).forEach((file) => {
  const abi = {}
  const abiFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, `${contractsABIPath}`, file), 'utf8')
  )
  abiFile.abi.forEach((element) => {
    if (element.type === 'constructor') {
      abi.constructor = element
    } else {
      if (element.name) {
        abi[element.name] = element
      }
    }
  })
  _contractsAbi[abiFile.contractName] = abi
})

// // Read file ContractInfo.md and take rows to aobtain the addres of each contract
// const contractsInfo = fs.readFileSync(
//   path.join(__dirname, `${contractsPath}/`, 'ContractInfo.md'),
//   'utf8'
// )
// const contractInfoRow = contractsInfo.split('\n')

/*
  FIXME load contract addresses from the ContractInfo.md file
  once the file address are up to date
 */

const contractsInfo = {
  Eidas: '0x701dE44500364Fb7388EA8de96d87E4A5371bA96',
  AlastriaServiceProvider: '0x9D5af64839e62d769abFAF1E11F75E4Bcd743D7C',
  AlastriaIdentityIssuer: '0x543DE49ea42a23C7411f12611A27C6aDBcb55b8C',
  AlastriaIdentityEntity: '0x10913e0c7400F9A7eC1bd01929203F6BDf6958Ce',
  AlastriaCredentialRegistry: '0xbCeb94fe0D428Dbd35B91aa64fa11067EA6a0122',
  AlastriaPresentationRegistry: '0xd2428F7023A059B3075564A1B2a0a8243E4aEb3B',
  AlastriaPublicKeyRegistry: '0x4De1CEFb60B757316176F31659414a7f6376AEd0',
  AlastriaIdentityManager: '0x948Cd4c7a26435b32C17e2Ea90C30cC7B3174EE5'
}

const config = {
  alastriaIdentityManager: contractsInfo.AlastriaIdentityManager,
  alastriaCredentialRegistry: contractsInfo.AlastriaCredentialRegistry,
  alastriaPresentationRegistry: contractsInfo.AlastriaPresentationRegistry,
  alastriaPublicKeyRegistry: contractsInfo.AlastriaPublicKeyRegistry,
  basicTransaction: {
    to: '0x0000000000000000000000000000000000000000',
    data: '0x0',
    gasLimit: 0,
    gasPrice: 0
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
