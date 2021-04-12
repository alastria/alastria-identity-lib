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
  Eidas: '0x73238B556a3ebdD444e58cA67c70EE02423e7006',
  AlastriaServiceProvider: '0x3edd539469d34BFacf77Ae0F271764594Cd1AF82',
  AlastriaIdentityIssuer: '0xC3084402b7B87a218B19Ed7a8B9E963C370258c7',
  AlastriaIdentityEntity: '0x1e7a94A63b04042B6302923f6AFA9Ccf1Ae0256C',
  AlastriaCredentialRegistry: '0xe9B858A4b79fbAa0c6a7C69Ff56122639E4c1892',
  AlastriaPresentationRegistry: '0x9FAdadE1734eFa76515BD49CBB4D26fa3d6C933c',
  AlastriaPublicKeyRegistry: '0xfe611588Bb7699A38594B4f2E0AA5Ecb0E7a3641',
  AlastriaIdentityManager: '0x6c60F15f4a30482Ba4769A21DF7727b9b69b2f90'
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
